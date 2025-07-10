import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Doughnut, Bar } from "react-chartjs-2";
import axios from "axios";
import { useAuth } from "../../auth/AuthProvider";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { format } from "date-fns";
import { FiHash } from "react-icons/fi";
import { bottom } from "@popperjs/core";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartDataLabels
);

// Helper function to get status color

const getStatusBadge = (statusId) => {
  switch (statusId) {
    case 3:
      return { variant: "success", text: "Delivered" };
    case 4:
      return { variant: "danger", text: "Not Delivered" };
    case 5:
      return { variant: "info", text: "Pending" };
    case 6:
      return { variant: "warning", text: "In Progress" };
    case 7:
      return { variant: "success", text: "Done" };
    case 8:
      return { variant: "primary", text: "Initiated" };
    case 9:
      return { variant: "danger", text: "Cancelled" };
    case 10:
      return { variant: "success", text: "Done and Closed" };
    case 11:
      return { variant: "success", text: "Filled" };
    case 12:
      return { variant: "secondary", text: "Unfilled" };
    default:
      return { variant: "secondary", text: "Unknown" };
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    return format(new Date(dateString), "dd MMM yyyy");
  } catch {
    return dateString;
  }
};

const Dashboard = () => {
  const [inventoryData, setInventoryData] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { role } = useAuth();

  const base_Url = import.meta.env.VITE_API_URL || "";

  const handleViewAllClick = () => {
    const isManager = role?.toLowerCase() === "manager";
    const targetPath = isManager
      ? "/manager/orders?tab=all"
      : "/assignments?tab=all";
    navigate(targetPath);
  };

  const handleToggleShowMore = () => {
    setVisibleCount((prev) =>
      prev === recentOrders.length ? 5 : recentOrders.length
    );
  };

  const handleShowDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  const calculateStatusCounts = (orders) => {
    const counts = {};

    orders.forEach((order) => {
      const { text: statusText } = getStatusBadge(order.statusId);
      counts[statusText] = (counts[statusText] || 0) + 1;
    });

    return counts;
  };
  const statusCounts = calculateStatusCounts(recentOrders);

  const calculateStatusPercentages = (orders) => {
    const counts = {};
    let total = orders.length;

    orders.forEach((order) => {
      const { text: statusText } = getStatusBadge(order.statusId);
      counts[statusText] = (counts[statusText] || 0) + 1;
    });

    // Map to array of { label, count, percentage }
    return Object.entries(counts).map(([label, count]) => ({
      label,
      count,
      percentage: ((count / total) * 100).toFixed(1),
    }));
  };
  const statusSummary = calculateStatusPercentages(recentOrders);

  const statusChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Delivery Status Distribution",
        data: Object.values(statusCounts),
        backgroundColor: [
          "#71c17a",
          "#007bff",
          "#ffc107",
          "#218838",
          "#dc3545",
          "#6c757d",
          "#adb5bd",
        ],
        borderWidth: 1,
        borderColor: "#fff",
      },
    ],
  };

  const calculateTotalUnitPrice = (products = []) => {
    return products.reduce((total, product) => {
      return total + product.unitPrice * product.quantityAssigned;
    }, 0);
  };

  useEffect(() => {
    const fetchInventory = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const response = await axios.post(
          `${base_Url}/inventory/liveInventoryList`,
          {
            page: 0,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("Inventory API raw response:", response.data);

        const items = response.data.result || [];

        // ✅ Map product names and quantities
        const labels = items.map((item) => item.product_name || "Unnamed");
        const dataValues = items.map((item) => item.total_quantity || 0);

        setInventoryData({
          labels,
          datasets: [
            {
              label: "Inventory Quantity",
              data: dataValues,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#00A36C",
                "#DFFF00",
                "#FF7F50",
              ],
              borderColor: "#ffffff",
              borderWidth: 2,
            },
          ],
        });

        // console.log("Mapped Doughnut Chart Data:", {
        //   labels,
        //   dataValues,
        // });
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, [base_Url]);

  const fetchTodayAssignments = async () => {
    try {
      const token = sessionStorage.getItem("token");
      // const today = new Date().toISOString().split("T")[0];

      const response = await axios.get(
        `${base_Url}/dailyAssignment/assignments/by_date`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      // console.log("Axios Response:", response.data);

      if (
        response.data.statusCode === 200 &&
        response.data.result?.length > 0
      ) {
        const sortedOrders = response.data.result.sort(
          (a, b) =>
            new Date(b.assignmentCreatedDate) -
            new Date(a.assignmentCreatedDate)
        );
        setRecentOrders(sortedOrders);
      } else {
        setRecentOrders([]);
      }
    } catch (error) {
      console.error("Error fetching today assignments:", error);
    }
  };

  useEffect(() => {
    fetchTodayAssignments();
  }, []);

  return (
    <>
      <div className="container py-4">
        <div className="row justify-content-center mb-4">
          {/* Delivery Status Donut Chart & Summary Section */}
          <div className="row justify-content-center mt-1 mb-4">
            {/* Chart Heading */}
            <div className="card-header  text-center mb-2">
              <h6 className="fw-bold text-black">Delivery Status</h6>
            </div>

            {/* Doughnut Chart */}
            <div className="col-12 col-md-6 d-flex justify-content-center">
              <div style={{ width: "320px", height: "320px" }}>
                <Doughnut
                  data={statusChartData}
                  options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      legend: {
                        position: bottom, // Disable default legend
                      },
                      datalabels: {
                        color: "#fff", // or "#000" for contrast
                        formatter: (value) => `${value}`,
                        font: {
                          weight: "bold",
                          size: 13,
                        },
                        anchor: "center", // Position relative to the arc
                        align: "center", // Align in the middle of the arc
                        offset: 0, // Centered exactly on slice
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Status Summary */}
            <div className="col-12 col-md-6">
              <h6 className="mb-3 fw-semibold text-center text-md-start">
                Delivery Status Summary
              </h6>
              <ul className="list-group">
                {statusSummary.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center">
                      <span
                        className="me-2"
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          backgroundColor: item.color,
                          display: "inline-block",
                        }}
                      ></span>
                      {item.label}
                    </div>
                    <span className="badge bg-secondary">
                      {item.percentage}% ({item.count})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Inventory  */}
          {/* Bar Chart Section */}
          <div className="row justify-content-center mb-4">
            <div className="flex justify-content-center">
              <div className="card">
                <div className="card-header text-black text-center">
                  <h6 className="mb-0">Inventory Overview</h6>
                </div>
                <div
                  className="card-body d-flex justify-content-center align-items-center"
                  style={{ height: "400px", width: "100%" }}
                >
                  {inventoryData ? (
                    <Bar
                      data={inventoryData}
                      options={{
                        indexAxis: "y",
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                          datalabels: {
                            color: "#000",
                            anchor: "end",
                            align: "left",
                            formatter: (value) => `${value}`,
                            font: {
                              weight: "bold",
                            },
                          },
                        },
                      }}
                      plugins={[ChartDataLabels]}
                    />
                  ) : (
                    <p>Loading inventory chart...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card shadow-sm h-100">
              <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
                <h6 className="mb-0 fw-bold">Recent Orders</h6>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleViewAllClick}
                >
                  View All
                </button>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0 text-center">
                    <thead className="table-light">
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders
                        .slice(0, visibleCount)
                        .map((order, index) => (
                          <tr key={index}>
                            <td>
                              <span className="badge bg-primary">
                                <FiHash className="me-1" />
                                {order.assignmentId}
                              </span>
                            </td>
                            <td>
                              {order.customerName || order.pointHolderName}
                            </td>
                            <td>
                              <span
                                className={`badge bg-${
                                  getStatusBadge(order.statusId).variant
                                }`}
                              >
                                {getStatusBadge(order.statusId).text}
                              </span>
                            </td>
                            <td>{formatDate(order.assignmentCreatedDate)}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => handleShowDetails(order)}
                              >
                                Details
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                    <Modal
                      show={showModal}
                      onHide={handleCloseModal}
                      centered
                      size="lg"
                      dialogClassName="responsive-modal"
                    >
                      <Modal.Header closeButton>
                        <div className="d-flex align-items-center w-100">
                          <Modal.Title className="fw-bold fs-5 mb-0">
                            Assignment Details
                          </Modal.Title>

                          {selectedOrder && (
                            <div className=" ms-3 fw-bold fs-5">
                              #{selectedOrder.assignmentId}
                            </div>
                          )}
                        </div>
                      </Modal.Header>

                      <Modal.Body
                        className="overflow-auto"
                        style={{ maxHeight: "75vh" }}
                      >
                        {selectedOrder ? (
                          <div className="px-1 px-sm-2">
                            {/* Customer Info */}
                            <h6 className="text-primary mt-3">
                              Customer Information
                            </h6>
                            <p>
                              <strong>Name:</strong>{" "}
                              {selectedOrder.customerName}
                            </p>
                            <p>
                              <strong>Mobile:</strong>{" "}
                              {selectedOrder.customerMobile}
                            </p>
                            <p>
                              <strong>Address:</strong>{" "}
                              {selectedOrder.customerAddress}
                            </p>

                            <hr />

                            {/* Assigned By */}
                            <h6 className="text-primary">Assigned By</h6>
                            <p>
                              <strong>Name:</strong>{" "}
                              {selectedOrder.assignedByFirstName}{" "}
                              {selectedOrder.assignedByLastName}
                            </p>
                            <p>
                              <strong>Mobile:</strong>{" "}
                              {selectedOrder.assignedByMobile}
                            </p>

                            <hr />

                            {/* Delivery Person */}
                            <h6 className="text-primary">Delivery Person</h6>
                            <p>
                              <strong>Name:</strong>{" "}
                              {selectedOrder.deliveryFirstName}{" "}
                              {selectedOrder.deliveryLastName}
                            </p>
                            <p>
                              <strong>Mobile:</strong>{" "}
                              {selectedOrder.deliveryMobile}
                            </p>

                            <hr />

                            <p>
                              <strong>Assignment Date:</strong>{" "}
                              {formatDate(selectedOrder.assignmentCreatedDate)}
                            </p>
                            <p>
                              <strong>Status:</strong>{" "}
                              {getStatusBadge(selectedOrder.statusId).text}
                            </p>

                            {/* Products Accordion */}
                            {selectedOrder.products?.length > 0 && (
                              <>
                                <hr />
                                <h6 className="text-primary mb-3">Products</h6>
                                <div
                                  className="accordion"
                                  id="productsAccordion"
                                >
                                  {selectedOrder.products.map(
                                    (product, index) => (
                                      <div
                                        className="accordion-item"
                                        key={index}
                                      >
                                        <h2
                                          className="accordion-header"
                                          id={`heading${index}`}
                                        >
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse${index}`}
                                            aria-expanded="false"
                                            aria-controls={`collapse${index}`}
                                          >
                                            {product.productName}
                                          </button>
                                        </h2>
                                        <div
                                          id={`collapse${index}`}
                                          className="accordion-collapse collapse"
                                          aria-labelledby={`heading${index}`}
                                          data-bs-parent="#productsAccordion"
                                        >
                                          <div className="accordion-body">
                                            <p>
                                              <strong>Category:</strong>{" "}
                                              {product.categoryName}
                                            </p>
                                            <p>
                                              <strong>Description:</strong>{" "}
                                              {product.categoryDescription}
                                            </p>
                                            <p>
                                              <strong>Quantity:</strong>{" "}
                                              {product.quantityAssigned}
                                            </p>
                                            <p>
                                              <strong>Unit Price:</strong> ₹
                                              {product.unitPrice}
                                            </p>
                                            <p>
                                              <strong>Total:</strong> ₹
                                              {product.unitPrice *
                                                product.quantityAssigned}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </>
                            )}

                            {/* Total Product Value */}
                            {selectedOrder.products?.length > 0 && (
                              <div className="mt-4">
                                <div className="d-flex justify-content-start">
                                  <div className="bg-light p-3 rounded shadow-sm border">
                                    <h6 className="mb-1 text-dark">
                                      Total Product Value
                                    </h6>
                                    <strong className="text-success fs-5">
                                      ₹{" "}
                                      {calculateTotalUnitPrice(
                                        selectedOrder.products
                                      )}
                                    </strong>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p>Loading...</p>
                        )}
                      </Modal.Body>

                      <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseModal}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </table>
                </div>

                {/* Show More / Show Less Button */}
                {recentOrders.length > 5 && (
                  <div className="text-center py-2">
                    <button
                      className="btn btn-sm btn-link"
                      onClick={handleToggleShowMore}
                    >
                      {visibleCount === recentOrders.length
                        ? "Show Less"
                        : "Show More"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
