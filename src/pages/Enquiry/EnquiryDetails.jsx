import React, { useState } from "react";
import Select from "react-select";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Table,
  Modal,
} from "react-bootstrap";
import {
  FaEdit,
  FaTrashAlt,
  FaUser,
  FaBuilding,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

// Dummy data
const dummyEnquiry = {
  clientId: "67e500a8c62a4adc91d47169",
  enquiryDate: "2025-06-18",
  companyName: "VT Enterprises",
  executiveName: "Dilip",
  contact: "9606605708",
  address:
    "8/2, 2ND CROSS, MANJUNATHA NAGAR, Bengaluru, Bengaluru Urban, Karnataka, 560016",
  deliveryDate: "2025-06-18",
  dismantleDate: "2025-06-19",
  selectedSlot: "Slot 2: 11:00 AM",
  venue: "BTM Layout, Bangalore",
  products: [
    {
      id: 4,
      name: "Modern Bench",
      stock: 106,
      qty: 1,
      price: 1200,
      total: 1200,
    },
    {
      id: 8,
      name: "Wooden Center Table",
      stock: 4,
      qty: 1,
      price: 2500,
      total: 2500,
    },
    {
      id: 6,
      name: "Round Dining Table",
      stock: 2,
      qty: 1,
      price: 6500,
      total: 6500,
    },
  ],
};

const allProducts = [
  { id: 4, name: "Modern Bench", availableStock: 106, price: 1200 },
  { id: 8, name: "Wooden Center Table", availableStock: 4, price: 2500 },
  { id: 6, name: "Round Dining Table", availableStock: 2, price: 6500 },
  {
    id: 10,
    name: "Distressed Rattan Cane Chair",
    availableStock: 10,
    price: 900,
  },
  { id: 11, name: "Oval Back Gold Chair", availableStock: 5, price: 1100 },
  { id: 12, name: "Poco Do Loco Chair", availableStock: 8, price: 950 },
  { id: 13, name: "Silver Darbar Chair", availableStock: 7, price: 1000 },
];

const EnquiryDetails = () => {
  const [products, setProducts] = useState(dummyEnquiry.products);
  const [confirmed, setConfirmed] = useState({});
  const [search, setSearch] = useState("");
  const [editIdx, setEditIdx] = useState(null);
  const [editQty, setEditQty] = useState(1);
  const [manpower, setManpower] = useState("");
  const [transport, setTransport] = useState("");
  const [discount, setDiscount] = useState("");
  const [gst, setGst] = useState("");
  const [roundOff, setRoundOff] = useState("");

  // Add Product Modal State
  const [showAdd, setShowAdd] = useState(false);
  const [addProductId, setAddProductId] = useState("");
  const [addQty, setAddQty] = useState(1);

  const gstOptions = [{ value: "18", label: "18%" }];

  // Filtered products for confirm section
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Confirmed total
  const totalAmount = products.reduce(
    (sum, p) => (confirmed[p.id] ? sum + p.qty * p.price : sum),
    0
  );

  // Edit handlers
  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditQty(products[idx].qty);
  };
  const handleEditSave = (idx) => {
    const prod = products[idx];
    // Only ensure at least 1 qty, no upper limit
    let qty = Math.max(1, Number(editQty) || 1);
    const updated = [...products];
    updated[idx] = {
      ...prod,
      qty,
      total: qty * prod.price,
      stock: prod.stock,
    };
    setProducts(updated);
    setEditIdx(null);
    setEditQty(1);
  };
  const handleEditCancel = () => {
    setEditIdx(null);
    setEditQty(1);
  };

  // Confirm button handler
  const handleConfirm = (id) => {
    setConfirmed((prev) => ({ ...prev, [id]: true }));
  };

  // Delete handler
  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setConfirmed((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  // Add Product Modal handlers
  const handleShowAdd = () => {
    setShowAdd(true);
    setAddProductId("");
    setAddQty(1);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
    setAddProductId("");
    setAddQty(1);
  };
  const handleAddProduct = () => {
    const prod = allProducts.find((p) => p.id === Number(addProductId));
    if (!prod) return;
    // Only ensure at least 1 qty, no upper limit
    const qty = Math.max(1, Number(addQty) || 1);
    setProducts((prev) => [
      ...prev,
      {
        id: prod.id,
        name: prod.name,
        stock: prod.availableStock,
        qty,
        price: prod.price,
        total: qty * prod.price,
      },
    ]);
    handleCloseAdd();
  };

  // Products not already in the list
  const availableToAdd = allProducts.filter(
    (p) => !products.some((prod) => prod.id === p.id)
  );

  // For Add Modal: selected product info
  const selectedAddProduct = allProducts.find(
    (p) => p.id === Number(addProductId)
  );

  const handleCreateQuote = () => {};

  // Calculate grand total
  const subtotal = totalAmount + Number(manpower || 0) + Number(transport || 0);
  const discountAmt = subtotal * (Number(discount || 0) / 100);
  const afterDiscount = subtotal - discountAmt;
  const gstAmt = afterDiscount * (Number(gst || 0) / 100);
  const grandTotal = Math.round(afterDiscount + gstAmt + Number(roundOff || 0));

  return (
    <Container
      fluid
      className="py-4"
      style={{ background: "#f6f8fa", minHeight: "100vh" }}
    >
      <Row>
        {/* Left: Enquiry Details */}
        <Col md={5} lg={4}>
          <Card
            className="mb-4 shadow-sm"
            style={{ borderRadius: 16, fontSize: 13 }}
          >
            <Card.Body>
              <div className="mb-3 text-center">
                <FaBuilding size={28} color="#323D4F" />
                <h5
                  className="mt-2 mb-0"
                  style={{ fontWeight: 700, fontSize: 18 }}
                >
                  {dummyEnquiry.companyName}
                </h5>
                <div style={{ fontSize: 12, color: "#888" }}>
                  {dummyEnquiry.clientId}
                </div>
              </div>
              <hr />
              <div className="mb-2 d-flex align-items-center">
                <FaUser className="me-2" />{" "}
                <span style={{ fontWeight: 600 }}>Executive:</span>
                <span className="ms-2">{dummyEnquiry.executiveName}</span>
              </div>
              <div className="mb-2 d-flex align-items-center">
                <FaPhone className="me-2" />{" "}
                <span style={{ fontWeight: 600 }}>Contact:</span>
                <span className="ms-2">{dummyEnquiry.contact}</span>
              </div>
              <div className="mb-2 d-flex align-items-center">
                <FaMapMarkerAlt className="me-2" />{" "}
                <span style={{ fontWeight: 600 }}>Venue:</span>
                <span className="ms-2">{dummyEnquiry.venue}</span>
              </div>
              <div className="mb-2 d-flex align-items-center">
                <FaCalendarAlt className="me-2" />{" "}
                <span style={{ fontWeight: 600 }}>Enquiry Date:</span>
                <span className="ms-2">{dummyEnquiry.enquiryDate}</span>
              </div>
              <div className="mb-2 d-flex align-items-center">
                <FaCalendarAlt className="me-2" />{" "}
                <span style={{ fontWeight: 600 }}>Delivery:</span>
                <span className="ms-2">{dummyEnquiry.deliveryDate}</span>
              </div>
              <div className="mb-2 d-flex align-items-center">
                <FaCalendarAlt className="me-2" />{" "}
                <span style={{ fontWeight: 600 }}>Dismantle:</span>
                <span className="ms-2">{dummyEnquiry.dismantleDate}</span>
              </div>
              <div className="mb-2 d-flex align-items-center">
                <FaClock className="me-2" />{" "}
                <span style={{ fontWeight: 600 }}>Slot:</span>
                <span className="ms-2">{dummyEnquiry.selectedSlot}</span>
              </div>
              <div className="mb-2">
                <span style={{ fontWeight: 600 }}>Address:</span>
                <div style={{ fontSize: 12, color: "#555" }}>
                  {dummyEnquiry.address}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Right: Product Details */}
        <Col md={7} lg={8}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h4 style={{ fontWeight: 700, marginBottom: 0 }}>Products</h4>
            <Button
              size="sm"
              style={{
                backgroundColor: "#323D4F",
                border: "none",
                transition: "background 0.2s",
              }}
              className="add-btn"
              onClick={handleShowAdd}
            >
              Add Product
            </Button>
          </div>
          <Table
            bordered
            hover
            responsive
            size="sm"
            style={{ background: "#fff", fontSize: 13, marginTop: "20px" }}
          >
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Stock</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, idx) => {
                const stock =
                  allProducts.find((ap) => ap.id === p.id)?.availableStock ||
                  p.stock;
                return (
                  <tr key={p.id}>
                    <td>{idx + 1}</td>
                    <td>{p.name}</td>
                    <td>{stock}</td>
                    <td>
                      {editIdx === idx ? (
                        <Form.Control
                          type="number"
                          min={1}
                          value={editQty}
                          onChange={(e) => {
                            let val = e.target.value.replace(/^0+/, "");
                            setEditQty(
                              val === "" ? "" : Math.max(1, Number(val))
                            );
                          }}
                          style={{
                            width: 70,
                            padding: "2px 6px",
                            fontSize: 13,
                          }}
                          autoFocus
                        />
                      ) : (
                        p.qty
                      )}
                    </td>
                    <td>₹{p.price}</td>
                    <td>₹{p.qty * p.price}</td>
                    <td>
                      {editIdx === idx ? (
                        <>
                          <Button
                            variant="success"
                            size="sm"
                            style={{ padding: "2px 6px", marginRight: 4 }}
                            onClick={() => handleEditSave(idx)}
                          >
                            <FaCheck />
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            style={{ padding: "2px 6px" }}
                            onClick={handleEditCancel}
                          >
                            <FaTimes />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="link"
                            size="sm"
                            style={{ color: "#157347", padding: 0 }}
                            onClick={() => handleEdit(idx)}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="link"
                            size="sm"
                            style={{ color: "#d00", padding: 0, marginLeft: 8 }}
                            onClick={() => handleDelete(p.id)}
                          >
                            <FaTrashAlt />
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          {/* Confirm Products Section as List */}
          <Card className="shadow-sm mb-4" style={{ borderRadius: 14 }}>
            <Card.Body>
              <div className="mb-3" style={{ maxWidth: 320 }}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search product to confirm..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              </div>
              <Table
                bordered
                hover
                responsive
                size="sm"
                style={{ background: "#f9f9f9", fontSize: 13 }}
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Order Qty</th>
                    <th>Available</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center text-muted">
                        No products found.
                      </td>
                    </tr>
                  )}
                  {filteredProducts.map((p, idx) => {
                    const stock =
                      allProducts.find((ap) => ap.id === p.id)
                        ?.availableStock || 0;
                    const canConfirm = p.qty <= stock;
                    return (
                      <tr key={p.id}>
                        <td>{idx + 1}</td>
                        <td>{p.name}</td>
                        <td>{p.qty}</td>
                        <td>{stock}</td>
                        <td>
                          {confirmed[p.id] ? (
                            <span style={{ color: "#28a745", fontWeight: 600 }}>
                              Confirmed
                            </span>
                          ) : (
                            <span
                              style={{ color: canConfirm ? "#007bff" : "#d00" }}
                            >
                              {canConfirm ? "Pending" : "Insufficient"}
                            </span>
                          )}
                        </td>
                        <td>
                          <Button
                            variant={
                              confirmed[p.id] ? "success" : "outline-success"
                            }
                            size="sm"
                            disabled={!canConfirm || confirmed[p.id]}
                            onClick={() => handleConfirm(p.id)}
                          >
                            {confirmed[p.id] ? "Confirmed" : "Confirm"}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showAdd} onHide={handleCloseAdd} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="addProductSelect">
              <Form.Label>Product Name</Form.Label>
              <Select
                options={availableToAdd.map((p) => ({
                  value: p.id,
                  label: p.name,
                }))}
                value={
                  addProductId
                    ? availableToAdd
                        .map((p) => ({ value: p.id, label: p.name }))
                        .find((opt) => opt.value === Number(addProductId))
                    : null
                }
                onChange={(selected) => {
                  setAddProductId(selected ? selected.value : "");
                  setAddQty(1);
                }}
                isClearable
                placeholder="Search product..."
              />
            </Form.Group>
            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="addProductStock">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      selectedAddProduct ? selectedAddProduct.availableStock : 0
                    }
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="addProductQty">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    min={1}
                    value={addQty}
                    disabled={!addProductId}
                    onChange={(e) => {
                      let val = e.target.value.replace(/^0+/, "");
                      setAddQty(val === "" ? "" : Math.max(1, Number(val)));
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="addProductPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    value={`₹${
                      selectedAddProduct ? selectedAddProduct.price : 0
                    }`}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="addProductTotal">
                  <Form.Label>Total Price</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      selectedAddProduct
                        ? `₹${(addQty ? addQty : 1) * selectedAddProduct.price}`
                        : "₹0"
                    }
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            size="sm"
            disabled={!addProductId || !addQty || addQty < 1}
            onClick={handleAddProduct}
          >
            Add
          </Button>
          <Button variant="secondary" size="sm" onClick={handleCloseAdd}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Sticky Footer for Total and Create Quotation */}
      <div
        style={{
          // position: "fixed",
          // left: 280,
          // bottom: 0,
          // width: "calc(100% - 260px)",
          background: "#fff",
          borderTop: "1px solid #eee",
          zIndex: 100,
          padding: "12px 0",
          marginBottom:"60px"
        }}
      >
        <Container className="px-5">
          <Form>
            <Row className="align-items-end mb-2">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Manpower Cost/Labour Charge</Form.Label>
                  <Form.Control
                    type="number"
                    value={manpower}
                    onChange={(e) => setManpower(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Transport Charge</Form.Label>
                  <Form.Control
                    type="number"
                    value={transport}
                    onChange={(e) => setTransport(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Discount (%)</Form.Label>
                  <Form.Control
                    type="number"
                    value={discount}
                    placeholder="Discount in percentage"
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>
                    Grand Total <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control type="text" value={grandTotal} readOnly />
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-end">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>GST</Form.Label>
                  <Select
                    options={gstOptions}
                    value={gstOptions.find((opt) => opt.value === gst) || null}
                    onChange={(opt) => setGst(opt ? opt.value : "")}
                    placeholder="Select GST"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Round off</Form.Label>
                  <Form.Control
                    type="number"
                    value={roundOff}
                    onChange={(e) => setRoundOff(e.target.value)}
                  />
                </Form.Group>
              </Col>
              {/* <Col
                md={6}
                className="text-end d-flex align-items-end justify-content-end"
              >
                <Button
                  variant="success"
                  size="sm"
                  style={{ fontWeight: 600 }}
                  disabled={grandTotal === 0}
                  onClick={handleCreateQuote}
                >
                  Create Quotation
                </Button>
              </Col> */}
            </Row>
          </Form>
        </Container>
      </div>
      <div
        style={{
          position: "fixed",
          left: 280, // <-- Adjust this to your sidebar width
          bottom: 0,
          width: "calc(100% - 260px)", // <-- Adjust this to your sidebar width
          background: "#fff",
          borderTop: "1px solid #eee",
          zIndex: 100,
          padding: "12px 0",
        }}
      >
        <Container className="px-5">
          <Row className="align-items-center">
            <Col xs={12} md={8} lg={10}>
              <span style={{ fontWeight: 700, fontSize: 18 }}>
                Total Confirmed Amount:{" "}
                <span style={{ color: "#28a745" }}>₹ {totalAmount}</span>
              </span>
            </Col>
            <Col xs={12} md={4} lg={2} className="text-end">
              <Button
                variant="success"
                size="sm"
                style={{ fontWeight: 600 }}
                disabled={totalAmount === 0}
                onClick={handleCreateQuote}
              >
                Create Quotation
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </Container>
  );
};

export default EnquiryDetails;
