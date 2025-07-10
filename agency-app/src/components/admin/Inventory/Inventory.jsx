import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import InventoryTable from "./InventoryModals/InventoryTable";
import ErrorAlert from "../../common/ErrorAlert";
import SearchBar from "../../common/SearchBar";
import ActionButton from "../../common/ActionButton";
import AddInventoryForm from "./InventoryModals/AddInventoryForm";
import Pagination from "../../common/Pagination";
import ConfirmationModal from "../../common/ConfirmationModal";
import RemoveInventoryForm from "./InventoryModals/RemoveInventoryForm";
import axios from "axios";

const PAGE_SIZE = 5;
const MAX_VISIBLE_PAGES = 5;
const base_Url = import.meta.env.VITE_API_URL || "";
const Inventory = () => {
  // state management
  const [inventory, setInventory] = useState([]);
  const [selectedinventory, setSelectedInventory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [_, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [filteredInventory, setFilteredInventory] = useState(inventory);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
  });

  // fetch inventory data from API
  const fetchInventory = useCallback(async (page = 0) => {
    const token = sessionStorage.getItem("token");
    setIsLoading(true);
    try {
      const response = await fetch(`${base_Url}/inventory/liveInventoryList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ page, pageSize: 5 }),
      });

      if (!response.ok) throw new Error("Failed to fetch inventory data");
      if (response.status === 200) {
        //toast.success("Inventory data fetched successfully")
      } else if (response.statusCode === 401) {
        toast.error("failed to fetch inventory data");
      } else if (response.status === 400) {
        toast.error("failed to fetch inventory data");
      } else {
        throw new Error("something went wrong");
      }

      const data = await response.json();

      setInventory(
        data.result.map((item) => ({
          id: item.id,
          product_id: item.product_id,
          product_name: item.product_name,
          category_id: item.category_id,
          category_name: item.category_name,
          filled_tank: item.filled_tank,
          un_filled_tank: item.un_filled_tank,
          total_quantity: item.total_quantity,
        }))
      );

      setPagination({
        currentPage: page,
        totalPages: Math.ceil(data.count / 5),
        totalElements: data.count,
      });

      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, []);

  // fetch inventory data on component mount
  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  // fetch product categories List

    const fetchCategories = useCallback(
      async (page) => {
        const token = sessionStorage.getItem("token");
        setIsLoading(true);

        try {
          const response = await axios.get(
            `${base_Url}/masters/getProductCategoryList`,
            {
              params: {
                page: 0,
                size: PAGE_SIZE,
              },
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = response.data;

          const categories = data.result.map((category) => ({
            srNo: category.srNo,
            id: category.id,
            categoryName: category.category_name,
            description: category.description,
            isActive: category.is_active,
          }));

          setPagination({
            currentPage: page,
            totalPages: data.totalPages || Math.ceil(data.count / PAGE_SIZE),
            totalElements: data.count,
          });

          setCategories(categories);
        } catch (error) {
          setError(error.message);
          console.log("Error fetching roles", error);
        } finally {
          setIsLoading(false);
        }
      },
      [base_Url]
    );

    useEffect(() => {
      fetchCategories();
    }, [fetchCategories]);

  useEffect(() => {
    const searched = inventory.filter((item) =>
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInventory(searched);
  }, [searchTerm, inventory]);

  const applyFilters = () => {
    const filtered = inventory.filter((item) => {
      const matchCategory =
        !categoryFilter ||
        String(item.category_name).toLowerCase() ===
          categoryFilter.toLowerCase();

      return matchCategory;
    });

    setFilteredInventory(filtered);
    setFiltersApplied(true);
  };

  const headers = inventory[0]
    ? Object.keys(inventory[0]).filter(
        (key) => key !== "id" && key !== "product_id" && key !== "category_id"
      )
    : [];

  const handleEdit = (inventoryItem) => {
    setSelectedInventory(inventoryItem);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleAdd = async (newInventory) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(`${base_Url}/inventory/addOrUpdate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newInventory),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      if (response.status === 200) {
        toast.success("Inventory data added successfully");
      }
      if (response.statusCode === 400) {
        toast.error("failed to add inventory data");
      }

      await fetchInventory();
      setSearchTerm("");
      setIsAdding(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSave = async (updatedInventory) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(`${base_Url}/inventory/addOrUpdate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedInventory),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      if (response.statusCode === 200) {
        toast.success("Inventory data updated successfully");
      }
      if (response.statusCode === 400) {
        toast.error("failed to update inventory data");
      }

      await fetchInventory();
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <ErrorAlert error={error} onDismiss={() => setError(null)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container-fluid p-3 p-md-4"
      style={{
        background: "linear-gradient(180deg, #e8ecf1 0%, #dcd9e6 100%)",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        minHeight: "calc(100vh - 66px)",
      }}
    >
      {!isEditing && !isAdding && (
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4 gap-3">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <ActionButton
            icon={faPlus}
            label="Add New Stock"
            onClick={() => {
              setSelectedInventory(null);
              setIsEditing(false);
              setIsAdding(true);
            }}
            bgColor="linear-gradient(90deg, #2b5876 0%, #4e4376 100%)"
            textColor="white"
          />
          <ActionButton
            icon={faPlus}
            label="Record Return"
            onClick={() => {
              setSelectedInventory(null);
              setIsEditing(true);
              setIsAdding(false);
            }}
            bgColor="linear-gradient(90deg, #2b5876 0%, #4e4376 100%)"
            textColor="white"
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="edit-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <RemoveInventoryForm
              product={selectedinventory}
              onAdd={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          </motion.div>
        ) : isAdding ? (
          <motion.div
            key="add-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <AddInventoryForm
              onAdd={handleAdd}
              onCancel={() => setIsAdding(false)}
            />
          </motion.div>
        ) : (
          <>
            <div className="d-flex flex-column flex-md-row gap-2 align-items-center mb-3">
              <select
                className="form-select"
                style={{ maxWidth: "200px" }}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.categoryName}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>

              <button className="btn btn-primary" onClick={applyFilters}>
                Apply Filters
              </button>
            </div>

            <motion.div
              key="table-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <InventoryTable
                inventories={filtersApplied ? filteredInventory : inventory}
                headers={headers}
                onEdit={handleEdit}
                pagination={pagination}
                onPageChange={(page) => fetchInventory(page)}
                fetchInventory={fetchInventory}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Inventory;
