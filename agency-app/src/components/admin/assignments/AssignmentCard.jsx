import React, { useState } from "react";
import {
  Card,
  Button,
  Badge,
  ListGroup,
  Row,
  Col,
  Accordion,
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {
  FiTrash2,
  FiCheckCircle,
  FiUser,
  FiTruck,
  FiPackage,
  FiCalendar,
  FiDollarSign,
  FiHash,
  FiInfo,
  FiUserPlus,
  FiHome,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import { format } from "date-fns";

const AssignmentCard = ({
  assignment,
  // onDelete,
  // onDailyClosure,
  // onAssignOrder,
}) => {
  const [showFull, setShowFull] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Helper functions
  const formatName = (firstName, lastName) => {
    return `${firstName || ""} ${lastName || ""}`.trim() || "N/A";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "dd MMM yyyy, hh:mm a");
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return "N/A";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (statusId) => {
    switch (statusId) {
      case 6:
        return { variant: "warning", text: "In Progress" };
      case 3:
        return { variant: "success", text: "Delivered" };
      case 4:
        return { variant: "danger", text: "Not Delivered" };
      case 5:
        return { variant: "info", text: "Pending" };
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

  const status = getStatusBadge(assignment.statusId);
  //console.log('Assignment Status:', assignment.statusId);

  // Determine recipient type
  const recipientType = assignment.customerId
    ? "customer"
    : assignment.agencyPointId
    ? "agency"
    : "none";

  return (
    <Card className="mb-3 shadow-sm w-[18rem]">
      <Card.Header className="d-flex justify-content-between align-items-center flex-wrap">
        <div className="d-flex flex-column flex-md-row flex-wrap align-items-start align-items-md-center gap-2 mb-2">
          {/* Badge Section */}
          <div className="d-flex flex-wrap align-items-center gap-2">
            <Badge bg="primary">
              <FiHash className="me-1" />
              {assignment.assignmentId}
            </Badge>

            <Badge bg={status.variant}>{status.text}</Badge>

            {assignment.products?.length > 0 && (
              <Badge bg="info" className="d-flex align-items-center">
                <FiPackage className="me-1" />
                {assignment.products.length}{" "}
                {assignment.products.length === 1 ? "product" : "products"}
              </Badge>
            )}
          </div>

          {/* More Info Button - Responsive */}
          {!showFull && (
            <div className="text-md-start text-center">
              <Button
                size="sm"
                className="py-1 px-2 text-sm"
                variant="outline-primary"
                onClick={() => setShowModal(true)}
              >
                More Info
              </Button>
            </div>
          )}
        </div>

        {/* <div className="d-flex gap-2">
          {assignment.statusId !== 10 &&
            assignment.statusId !== 7 &&
            assignment.statusId !== 3 && (
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => onAssignOrder(assignment.assignmentId)}
                className="d-flex align-items-center"
              >
                <FiUserPlus className="me-1" />
                <span className="d-none d-sm-inline">Assign Order</span>
              </Button>
            )}

          {assignment.statusId !== 10 && (
            <Button
              variant="outline-success"
              size="sm"
              onClick={onDailyClosure}
              className="d-flex align-items-center"
            >
              <FiCheckCircle className="me-1" />
              <span className="d-none d-sm-inline">Complete</span>
            </Button>
          )}
          <Button
            variant="outline-danger"
            size="sm"
            onClick={onDelete}
            className="d-flex align-items-center"
          >
            <FiTrash2 className="me-1" />
            <span className="d-none d-sm-inline">Delete</span>
          </Button>
        </div> */}
      </Card.Header>

      <Card.Body>
        <ListGroup variant="flush">
          {/* Always Visible: Name & Phone */}
          <ListGroup.Item className="bg-light">
            <div className="d-flex align-items-center">
              <FiHome className="me-2 text-primary" />
              <div>
                <strong>
                  {recipientType === "customer"
                    ? "Customer"
                    : recipientType === "agency"
                    ? "Agency Point"
                    : "Recipient"}
                </strong>
              </div>
            </div>
          </ListGroup.Item>

          {recipientType === "customer" ? (
            <>
              <ListGroup.Item>
                <div className="d-flex align-items-start">
                  <FiUser className="me-2 mt-1 text-success" />
                  <div>
                    <strong>Name:</strong> {assignment.customerName || "N/A"}
                  </div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex align-items-center">
                  <FiPhone className="me-2 text-info" />
                  <div>
                    <strong>Mobile:</strong>{" "}
                    {assignment.customerMobile || "N/A"}
                  </div>
                </div>
              </ListGroup.Item>
            </>
          ) : recipientType === "agency" ? (
            <>
              <ListGroup.Item>
                <div className="d-flex align-items-start">
                  <FiUser className="me-2 mt-1 text-success" />
                  <div>
                    <strong>Point Name:</strong>{" "}
                    {assignment.agencyPointName || "N/A"}
                  </div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex align-items-center">
                  <FiPhone className="me-2 text-info" />
                  <div>
                    <strong>Mobile:</strong>{" "}
                    {assignment.agencyPointMobile || "N/A"}
                  </div>
                </div>
              </ListGroup.Item>
            </>
          ) : (
            <ListGroup.Item>
              <div className="text-muted">No recipient data available</div>
            </ListGroup.Item>
          )}

          {/* Show full details only if showFull is true */}
          {showFull && (
            <>
              {/* Address */}
              {recipientType === "customer" ? (
                <ListGroup.Item>
                  <div className="d-flex align-items-start">
                    <FiMapPin className="me-2 mt-1 text-warning" />
                    <div>
                      <strong>Address:</strong>{" "}
                      {assignment.customerAddress || "N/A"}
                    </div>
                  </div>
                </ListGroup.Item>
              ) : recipientType === "agency" ? (
                <>
                  <ListGroup.Item>
                    <div className="d-flex align-items-start">
                      <FiUser className="me-2 mt-1 text-success" />
                      <div>
                        <strong>Holder Name:</strong>{" "}
                        {assignment.pointHolderName || "N/A"}
                      </div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-flex align-items-start">
                      <FiMapPin className="me-2 mt-1 text-warning" />
                      <div>
                        <strong>Address:</strong>{" "}
                        {assignment.agencyPointAddress || "N/A"}
                      </div>
                    </div>
                  </ListGroup.Item>
                </>
              ) : null}

              {/* Assigned By */}
              <ListGroup.Item>
                <div className="d-flex align-items-start">
                  <FiUser className="me-2 mt-1 text-primary" />
                  <div>
                    <strong>Assigned By:</strong>{" "}
                    {formatName(
                      assignment.assignedByFirstName,
                      assignment.assignedByLastName
                    )}
                    <div className="text-muted small">
                      {assignment.assignedByRole || "N/A"} •{" "}
                      {assignment.assignedByMobile || "N/A"}
                    </div>
                  </div>
                </div>
              </ListGroup.Item>

              {/* Delivery Person */}
              <ListGroup.Item>
                <div className="d-flex align-items-start">
                  <FiTruck className="me-2 mt-1 text-success" />
                  <div>
                    <strong>Delivery Person:</strong>{" "}
                    {formatName(
                      assignment.deliveryFirstName,
                      assignment.deliveryLastName
                    )}
                    <div className="text-muted small">
                      {assignment.deliveryRole || "N/A"} •{" "}
                      {assignment.deliveryMobile || "N/A"}
                    </div>
                  </div>
                </div>
              </ListGroup.Item>

              {/* Assignment Date */}
              <ListGroup.Item>
                <div className="d-flex align-items-center">
                  <FiCalendar className="me-2 text-info" />
                  <div>
                    <strong>Assigned Date:</strong>{" "}
                    {formatDate(assignment.assignmentCreatedDate)}
                  </div>
                </div>
              </ListGroup.Item>

              {/* Product Details (optional: render as simple list or keep accordion if needed) */}
              {assignment.products?.length > 0 && (
                <>
                  <ListGroup.Item className="bg-light">
                    <div className="d-flex align-items-center">
                      <FiPackage className="me-2 text-warning" />
                      <strong>Product Details</strong>
                    </div>
                  </ListGroup.Item>
                  {assignment.products.map((product, index) => (
                    <ListGroup.Item key={index}>
                      <div>
                        <strong>{product.productName}</strong> - Qty:{" "}
                        {product.quantityAssigned || 0}, Unit:{" "}
                        {formatCurrency(product.unitPrice)}
                        <div className="text-muted small">
                          Total:{" "}
                          {formatCurrency(
                            (product.quantityAssigned || 0) *
                              (product.unitPrice || 0)
                          )}
                        </div>
                        {product.categoryDescription && (
                          <div className="text-muted small mt-1">
                            <FiInfo className="me-1" />
                            {product.categoryDescription}
                          </div>
                        )}
                      </div>
                    </ListGroup.Item>
                  ))}
                </>
              )}
            </>
          )}
        </ListGroup>
      </Card.Body>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Assignment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            {/* Address */}
            {recipientType === "customer" ? (
              <>
                <ListGroup.Item>
                  <div className="d-flex align-items-start">
                    <FiUser className="me-2 mt-1 text-success" />
                    <div>
                      <strong>Name:</strong> {assignment.customerName || "N/A"}
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex align-items-center">
                    <FiPhone className="me-2 text-info" />
                    <div>
                      <strong>Mobile:</strong>{" "}
                      {assignment.customerMobile || "N/A"}
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <FiMapPin className="me-2 text-warning" />
                  <strong>Address:</strong>{" "}
                  {assignment.customerAddress || "N/A"}
                </ListGroup.Item>
              </>
            ) : recipientType === "agency" ? (
              <>
                <ListGroup.Item>
                  <FiUser className="me-2 text-success" />
                  <strong>Holder Name:</strong>{" "}
                  {assignment.pointHolderName || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <FiMapPin className="me-2 text-warning" />
                  <strong>Address:</strong>{" "}
                  {assignment.agencyPointAddress || "N/A"}
                </ListGroup.Item>
              </>
            ) : null}

            {/* Assigned By */}
            <ListGroup.Item>
              <FiUser className="me-2 text-primary" />
              <strong>Assigned By:</strong>{" "}
              {formatName(
                assignment.assignedByFirstName,
                assignment.assignedByLastName
              )}
              <div className="text-muted small">
                {assignment.assignedByRole || "N/A"} •{" "}
                {assignment.assignedByMobile || "N/A"}
              </div>
            </ListGroup.Item>

            {/* Delivery Person */}
            <ListGroup.Item>
              <FiTruck className="me-2 text-success" />
              <strong>Delivery Person:</strong>{" "}
              {formatName(
                assignment.deliveryFirstName,
                assignment.deliveryLastName
              )}
              <div className="text-muted small">
                {assignment.deliveryRole || "N/A"} •{" "}
                {assignment.deliveryMobile || "N/A"}
              </div>
            </ListGroup.Item>

            {/* Assigned Date */}
            <ListGroup.Item>
              <FiCalendar className="me-2 text-info" />
              <strong>Assigned Date:</strong>{" "}
              {formatDate(assignment.assignmentCreatedDate)}
            </ListGroup.Item>

            {/* Product Details */}
            {assignment.products?.length > 0 && (
              <>
                <ListGroup.Item className="bg-light">
                  <FiPackage className="me-2 text-warning" />
                  <strong>Product Details</strong>
                </ListGroup.Item>
                {assignment.products.map((product, index) => (
                  <ListGroup.Item key={index}>
                    <strong>{product.productName}</strong> - Qty:{" "}
                    {product.quantityAssigned || 0}, Unit:{" "}
                    {formatCurrency(product.unitPrice)}
                    <div className="text-muted small">
                      Total:{" "}
                      {formatCurrency(
                        (product.quantityAssigned || 0) *
                          (product.unitPrice || 0)
                      )}
                    </div>
                    {product.categoryDescription && (
                      <div className="text-muted small mt-1">
                        <FiInfo className="me-1" />
                        {product.categoryDescription}
                      </div>
                    )}
                  </ListGroup.Item>
                ))}
              </>
            )}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default AssignmentCard;
