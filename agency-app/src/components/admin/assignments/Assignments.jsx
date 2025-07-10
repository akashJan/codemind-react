import React, { useState, useEffect } from "react";
import {
  Container,
  Tabs,
  Tab,
  Button,
  Toast,
  Spinner,
  Stack,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import AssignmentCard from "./AssignmentCard";
import { toast, ToastContainer } from "react-toastify";
import CreateAssignmentModal from "./AssignmentModel/CreateAssignmentModal";
import AssignOrderModal from "./AssignmentModel/AssignOrderModel";
import AssignmentSearchBar from "../../manager/AssignmentSearchBar";
import AssignmentFilterBar from "../../manager/AssignmentFilterBar";
import { useAuth } from "../../../auth/AuthProvider";
import { useSearchParams } from "react-router-dom";
import nodata from "../../../assets/undraw_empty_4zx0.svg";
const base_url = import.meta.env.VITE_API_URL || "";

const Assignments = () => {
  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
    );
  }

  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "today";
  const [activeTab, setActiveTab] = useState(defaultTab);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTermToday, setSearchTermToday] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [allAssignments, setAllAssignments] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [searchTermAll, setSearchTermAll] = useState("");
  const [isLoading, setIsLoading] = useState({
    today: true,
    all: true,
  });
  const [toasts, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    managerId: "",
    deliveryBoyId: "",
  });

  const fetchTodayAssignments = async () => {
    setIsLoading((prev) => ({ ...prev, today: true }));
    try {
      const token = sessionStorage.getItem("token");

      const today = new Date().toISOString().split("T")[0];
      const response = await fetch(
        `${base_url}/dailyAssignment/assignments/by_date?startDate=${today}&endDate=${today}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.result) {
        setAssignments(data.result);
      } else {
        setAssignments([]);
      }
    } catch (error) {
      console.error("Error fetching today assignments:", error);

      toast.error("Failed to load today's assignments. Please try again.");
    } finally {
      setIsLoading((prev) => ({ ...prev, today: false }));
    }
  };

  const fetchAllAssignments = async () => {
    setIsLoading((prev) => ({ ...prev, all: true }));
    try {
      let url = `${base_url}/dailyAssignment/assignments/by_date`;
      const queryParams = new URLSearchParams();

      if (filters.startDate) queryParams.append("startDate", filters.startDate);
      if (filters.endDate) queryParams.append("endDate", filters.endDate);
      if (filters.managerId) queryParams.append("managerId", filters.managerId);
      if (filters.deliveryBoyId)
        queryParams.append("deliveryBoyId", filters.deliveryBoyId);

      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.result) {
        setAllAssignments(data.result);
      } else {
        setAllAssignments([]);
      }
    } catch (error) {
      console.error("Error fetching all assignments:", error);
      //showToast("Failed to load all assignments. Please try again.", "danger");
      toast.error("Failed to load all assignments. Please try again.");
    } finally {
      setIsLoading((prev) => ({ ...prev, all: false }));
    }
  };

  useEffect(() => {
    fetchTodayAssignments();
  }, [showAssignModal, activeTab]);

  useEffect(() => {
    if (activeTab === "all") {
      fetchAllAssignments();
    }
  }, [activeTab, filters, showAssignModal]);

  const showToast = (message, variant = "success") => {
    setToast({ show: true, message, variant });
  };

  const filterAssignmentsById = (assignments, searchTerm) => {
    if (!searchTerm) return assignments;
    return assignments.filter(
      (assignment) =>
        assignment.assignmentId.toString().includes(searchTerm.toLowerCase()) ||
        assignment.deliveryFirstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  };

  const handleCreateAssignment = async (formData) => {
    try {
      const response = await fetch(`${base_url}/dailyAssignment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchTodayAssignments();
      setShowCreateModal(false);

      //showToast("Assignment created successfully");
      toast.success("Assignment created successfully");
    } catch (error) {
      console.error("Error creating assignment:", error);
      //showToast("Failed to create assignment. Please try again.", "danger");
      toast.error("Failed to create assignment. Please try again.");
    }
  };

  const handleDailyClosure = async (assignment) => {
    const assignmentData = {
      dailyAssignmentId: { id: assignment.assignmentId },
      statusId: { id: assignment.statusId },
      confirmedById: { id: user.userId },
      deliveredById: { id: assignment.deliveryPersonIdOut },
      isCompletedByDeliveryPerson: assignment.statusId === 3 ? true : false,
      lastModifiedBy: user.userId,
    };

    try {
      const response = await fetch(
        `${base_url}/dailyAssignment/dailyClosureByManager`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(assignmentData),
        }
      );
      const responseData = await response.json();
      if (responseData.statusCode === 500) {
        toast.error(toTitleCase(responseData.message));
      } else if (responseData.statusCode === 200) {
        toast.success(toTitleCase(responseData.message));
        fetchTodayAssignments();
        fetchAllAssignments();
      } else if (responseData.statusCode === 400) {
        toast.error(toTitleCase(responseData.message));
      } else {
        toast.error("Failed to complete daily closure. Please try again.");
      }
    } catch (error) {
      console.error("Error completing daily closure:", error);

      toast.error("Failed to complete daily closure. Please try again.");
    }
  };

  const filteredAllAssignments = filterAssignmentsById(
    allAssignments,
    searchTermAll
  );

  const filteredTodayAssignments = filterAssignmentsById(
    assignments,
    searchTermToday
  );

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAssignOrder = async (assignment_id) => {
    setSelectedOrderId(assignment_id);
    setShowAssignModal(true);
  };

  return (
    <Container className="py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Daily Assignment Management</h2>
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          + Create New Assignment
        </Button>
      </div>

      <Tabs activeKey={activeTab} onSelect={setActiveTab} className="mb-3">
        <Tab eventKey="today" title="Today's Assignments">
          <AssignmentSearchBar
            onSearch={setSearchTermToday}
            placeholder="Search today's assignments by ID..."
          />
          {isLoading.today ? (
            <div className="text-center py-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p className="mt-2">Loading today's assignments...</p>
            </div>
          ) : (
            <Container className="mt-4">
              <Row className="g-4">
                {filteredTodayAssignments.length === 0 ? (
                  <Col>
                    <div className="alert alert-info w-100">
                      <div className="d-flex flex-column align-items-center justify-content-center py-4 text-center text-muted">
                        <img
                          src={nodata}
                          alt="No assignments"
                          className="mb-3"
                          style={{
                            width: "340px",
                            height: "340px",
                            opacity: 0.9,
                          }}
                        />
                        <h2 className="h5 fw-semibold">
                          {searchTermToday
                            ? "No matching assignments found"
                            : "No assignments found for today"}
                        </h2>
                      </div>
                    </div>
                  </Col>
                ) : (
                  filteredTodayAssignments.map((assignment) => (
                    <Col
                      key={assignment.assignmentId}
                      xs={12}
                      sm={6}
                      md={6}
                      lg={4}
                    >
                      <AssignmentCard
                        key={assignment.assignmentId}
                        assignment={assignment}
                        onDailyClosure={() => handleDailyClosure(assignment)}
                        onAssignOrder={handleAssignOrder}
                      />
                    </Col>
                  ))
                )}
              </Row>
            </Container>
          )}
        </Tab>

        <Tab eventKey="all" title="All Assignments">
          <AssignmentSearchBar
            onSearch={setSearchTermAll}
            placeholder="Search all assignments by ID..."
          />
          <AssignmentFilterBar onFilterChange={handleFilterChange} />

          {isLoading.all ? (
            <div className="text-center py-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p className="mt-2">Loading all assignments...</p>
            </div>
          ) : (
            <Container className="mt-4">
              <Row className="g-4">
                {filteredAllAssignments.length === 0 ? (
                  <Col>
                    <div className="alert alert-info w-100">
                      {searchTermAll
                        ? "No matching assignments found"
                        : "No assignments found with the current filters"}
                    </div>
                  </Col>
                ) : (
                  filteredAllAssignments.map((assignment) => (
                    <Col
                      key={assignment.assignmentId}
                      xs={12}
                      sm={6}
                      md={6}
                      lg={4}
                    >
                      <AssignmentCard
                        assignment={assignment}
                        onDailyClosure={() => handleDailyClosure(assignment)}
                        onAssignOrder={handleAssignOrder}
                      />
                    </Col>
                  ))
                )}
              </Row>
            </Container>
          )}
        </Tab>
      </Tabs>

      <CreateAssignmentModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onSubmit={handleCreateAssignment}
      />

      <AssignOrderModal
        show={showAssignModal}
        handleClose={() => setShowAssignModal(false)}
        assignmentId={selectedOrderId}
        currentUserId={user?.userId} // Get this from your auth context
        //refreshOrders={fetchOrders} // Your function to refresh orders
      />
    </Container>
  );
};

export default Assignments;
