import React, { useEffect, useState } from "react";
import { Button, Card, Table, Container, Modal, Form } from "react-bootstrap";
import Pagination from "../../components/Pagination";
import { FaTrashAlt } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const dummyClients = [
  {
    companyName: "VT Enterprises",
    contactPersonNumber: "9606605708",
    email: "vt@gmail.com",
    address: "8/2, 2ND CROSS, MANJUNATHA NAGAR, Bengaluru",
    executives: [
      { name: "Suresh Kumar", phone: "9823051234" },
      { name: "Pooja Rao", phone: "9345678123" },
    ],
  },
  {
    companyName: "EMG Productions",
    contactPersonNumber: "7019871203",
    email: "emg@example.com",
    address: "#6, 1st floor, Anepalya Main Road, Bengaluru",
    executives: [
      { name: "Arjun Mehta", phone: "9876543210" },
    ],
  },
  {
    companyName: "Pixel Creatives",
    contactPersonNumber: "9123456780",
    email: "pixel@example.com",
    address: "45, MG Road, Chennai",
    executives: [],
  },
];

const Client = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [viewClient, setViewClient] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // Load from localStorage or fallback to dummy data
  useEffect(() => {
    const storedClients = localStorage.getItem("clients");
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    } else {
      localStorage.setItem("clients", JSON.stringify(dummyClients));
      setClients(dummyClients);
    }
  }, []);

  const handleDeleteClient = (index) => {
    const updatedClients = clients.filter((_, i) => i !== index);
    setClients(updatedClients);
    localStorage.setItem("clients", JSON.stringify(updatedClients));
  };

  const handleDeleteSelected = () => {
    const updatedClients = clients.filter((_, index) => !selectedRows.includes(index));
    setClients(updatedClients);
    setSelectedRows([]);
    localStorage.setItem("clients", JSON.stringify(updatedClients));
  };

  const handleSelectRow = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredClients.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(clients.map((_, index) => index));
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleViewClient = (client) => {
    setViewClient(client);
    setShowViewModal(true);
  };

  const filteredClients = clients.filter((client) =>
    client.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container style={{ background: "#F4F4F4", paddingBlock: "20px" }}>
      <div className="d-flex justify-content-between mb-3">
        <Form.Control
          type="text"
          placeholder="Search Client"
          value={searchQuery}
          onChange={handleSearchChange}
          className="shadow-sm"
          style={{ width: "250px", fontSize: "12px" }}
        />
        <div className="d-flex gap-2">
          <Button
            onClick={() => navigate("/add-client")}
            variant="primary"
            className="fw-bold rounded-1 shadow-lg"
            style={{
              fontSize: "12px",
              padding: "6px 12px",
              background: "#5c6bc0",
              borderColor: "#5c6bc0",
            }}
          >
            + Add Client
          </Button>
          {selectedRows.length > 0 && (
            <Button
              variant="outline-danger"
              onClick={handleDeleteSelected}
              style={{ fontSize: "12px", padding: "6px 12px" }}
            >
              Delete {selectedRows.length} Selected
            </Button>
          )}
        </div>
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
                <th style={{ width: "5%" }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.length === filteredClients.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="text-start">Company Name</th>
                <th className="text-start">Phone Number</th>
                <th className="text-start">Address</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, index) => (
                <tr key={index} className="text-center hover-row">
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleSelectRow(index)}
                    />
                  </td>
                  <td className="fw-semibold text-start" style={{ fontSize: "12px" }}>
                    {client.companyName}
                  </td>
                  <td className="text-start" style={{ fontSize: "12px" }}>
                    {client.contactPersonNumber || "-"}
                  </td>
                  <td className="text-start" style={{ fontSize: "12px" }}>
                    {client.address}
                  </td>
                  <td className="text-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="me-2"
                      style={{ padding: "4px 8px", fontSize: "10px" }}
                      onClick={() => handleDeleteClient(index)}
                    >
                      <FaTrashAlt />
                    </Button>
                    <Button
                      variant="outline-dark"
                      size="sm"
                      className="icon-btn"
                      style={{ padding: "4px 8px", fontSize: "10px" }}
                      onClick={() => handleViewClient(client)}
                    >
                      <MdVisibility />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>

      <Pagination totalItems={filteredClients.length} />

      {/* View Modal */}
      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Client Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "14px" }}>
          {viewClient && (
            <>
              <p><strong>Company Name:</strong> {viewClient.companyName}</p>
              <p><strong>Contact Person Number:</strong> {viewClient.contactPersonNumber}</p>
              <p><strong>Email:</strong> {viewClient.email || "N/A"}</p>
              <p><strong>Address:</strong> {viewClient.address}</p>
              <hr />
              <h6>Executives:</h6>
              {viewClient.executives && viewClient.executives.length > 0 ? (
                viewClient.executives.map((exec, idx) => (
                  <p key={idx}>👤 {exec.name} - 📞 {exec.phone}</p>
                ))
              ) : (
                <p>No executives added.</p>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Client;
