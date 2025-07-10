import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ProductsTable from "./productModels/ProductsTable";
import LoadingSpinner from "../../common/LoadingSpinner";
import ErrorAlert from "../../common/ErrorAlert";
import SearchBar from "../../common/SearchBar";
import ActionButton from "../../common/ActionButton";
import EditProductForm from "./productModels/EditProductForm";
import AddProductForm from "./productModels/AddProductForm";
import Pagination from "../../common/Pagination";
import ConfirmationModal from "../../common/ConfirmationModal";
import { toast } from "react-toastify";
import axios from "axios";

const Team = () => {
  const PAGE_SIZE = 5;
  const base_Url = import.meta.env.VITE_API_URL || "";

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filtersApplied, setFiltersApplied] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
  });

  const fetchProducts = useCallback(async (page = 0) => {
    const token = sessionStorage.getItem("token");
    setLoading(true);
    try {
      const response = await fetch(`${base_Url}/masters/getProductList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          page,
          size: PAGE_SIZE,
        }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      setProducts(
        data.result.map((product) => ({
          id: product.Id,
          productName: product.productName,
          categoryId: product.categoryId,
          categoryName: product.categoryName,
          isActive: product.isActive,
        }))
      );

      setPagination({
        currentPage: page,
        totalPages: Math.ceil(data.count / PAGE_SIZE),
        totalElements: data.count,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const fetchCategories = useCallback(
    async (page) => {
      const token = sessionStorage.getItem("token");
      setLoading(true);

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
        setLoading(false);
      }
    },
    [base_Url]
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const searchedProduct = useMemo(() => {
    return (filtersApplied ? filteredProducts : products).filter((item) =>
      item.productName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products, filteredProducts, filtersApplied]);

  const applyFilters = () => {
    const filtered = products.filter((product) => {
      const matchCategory =
        !categoryFilter || product.categoryId === parseInt(categoryFilter);

      const matchStatus =
        !statusFilter ||
        (statusFilter === "active" && product.isActive) ||
        (statusFilter === "inactive" && !product.isActive);

      return matchCategory && matchStatus;
    });

    setFilteredProducts(filtered);
    setFiltersApplied(true);
  };

  // Directly Applies the filteration without button
  // useEffect(() => {
  //   applyFilters();
  // }, [statusFilter, categoryFilter, searchTerm, products]);

  const headers =
    products.length > 0
      ? Object.keys(products[0]).filter((key) => key !== "id")
      : [];

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setIsAdding(false);
  };

  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!productToDelete?.id) return;

    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `${base_Url}/masters/deleteProductById/${productToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      if (response.status === 200) {
        toast.warning("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
      await fetchProducts(pagination.currentPage);
      setShowDeleteModal(false);
      setproductToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSave = async (updatedProduct) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(`${base_Url}/masters/saveAndUpdateProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProduct),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      await fetchProducts(pagination.currentPage);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAdd = async (newProduct) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(`${base_Url}/masters/saveAndUpdateProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      if (response.status === 200) {
        toast.success("Product added successfully");
      } else {
        toast.error("Failed to add product");
      }
      await fetchProducts(0);
      setSearchTerm("");
      setIsAdding(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pagination.totalPages) {
      fetchProducts(newPage);
    }
  };

  if (loading && !isEditing && !isAdding) {
    return <LoadingSpinner />;
  }

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
            label="Add Product"
            onClick={() => {
              setSelectedProduct(null);
              setIsEditing(false);
              setIsAdding(true);
            }}
            bgColor="linear-gradient(90deg, #2b5876 0%, #4e4376 100%)"
            textColor="white"
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {isEditing && selectedProduct ? (
          <EditProductForm
            product={selectedProduct}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        ) : isAdding ? (
          <AddProductForm
            onAdd={handleAdd}
            onCancel={() => setIsAdding(false)}
          />
        ) : (
          <>
            <div className="d-flex flex-column flex-md-row gap-3 align-items-center mb-3">
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{ maxWidth: "200px" }}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ maxWidth: "200px" }}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <button className="btn btn-primary" onClick={applyFilters}>
                Apply Filters
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setCategoryFilter("");
                  setStatusFilter("");
                  setFiltersApplied(false);
                }}
              >
                Clear Filters
              </button>
            </div>

            <ProductsTable
              products={(filteredProducts, searchedProduct)}
              headers={headers}
              onEdit={handleEdit}
              onDelete={confirmDelete}
            />

            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalElements={pagination.totalElements}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </AnimatePresence>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete ${productToDelete?.productName}?`}
      />
    </motion.div>
  );
};

export default Team;
