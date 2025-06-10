import React, { useState } from "react";
import { Button, Card, Container, Form, Table } from "react-bootstrap";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import moment from "moment";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";

const dummyRefurbishments = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  orderId: `ORD${String(i + 1).padStart(3, "0")}`,
  floorManager: `Manager ${i + 1}`,
  shippingAddress: `123 Street ${i + 1}, City`,
  createdAt: moment().subtract(i, "days").toISOString(),
}));

const RefurbishmentReport = () => {
  const [refurbs, setRefurbs] = useState(dummyRefurbishments);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const filteredRefurbs = refurbs.filter((item) =>
    `${item.orderId} ${item.floorManager} ${item.shippingAddress}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRefurbs.length / itemsPerPage);
  const paginatedRefurbs = filteredRefurbs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (confirm) {
      setRefurbs((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleView = (id) => {
    // alert(`Viewing details for Order ID: ${id}`);
    navigate("/refurbishment-invoice")
  };

  return (
    <Container style={{ background: "#F4F4F4", paddingBlock: "20px" }}>
      <div className="d-flex justify-content-between mb-3">
        <Form.Control
          type="text"
          placeholder="Search by Order ID, Manager, Address"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "300px", fontSize: "12px" }}
        />
      </div>

      <Card className="border-0 shadow-sm">
        <div
          className="table-responsive bg-white rounded-lg"
          style={{ maxHeight: "65vh", overflowY: "auto" }}
        >
          <Table className="table table-hover align-middle">
            <thead
              className="text-white text-center"
              style={{ backgroundColor: "#323D4F", fontSize: "12px" }}
            >
              <tr>
                <th>S.No.</th>
                <th>Order ID</th>
                <th>Floor Manager</th>
                <th>Shipping Address</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRefurbs.map((item, index) => (
                <tr
                  key={item.id}
                  className="text-center"
                  style={{ fontSize: "12px" }}
                >
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{item.orderId}</td>
                  <td>{item.floorManager}</td>
                  <td>{item.shippingAddress}</td>
                  <td>{moment(item.createdAt).format("MM/DD/YYYY hh:mm A")}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleView(item.orderId)}
                      className="me-2"
                    >
                      <FaEye />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              ))}
              {paginatedRefurbs.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No refurbishment records found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* Pagination */}
      <Pagination totalItems={totalPages} />

      {/* {totalPages > 1 && (
        <div className="d-flex justify-content-end mt-3">
          <div className="d-flex gap-2">
            <Button
              variant="outline-secondary"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <span style={{ fontSize: "12px", lineHeight: "32px" }}>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline-secondary"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )} */}
    </Container>
  );
};

export default RefurbishmentReport;
