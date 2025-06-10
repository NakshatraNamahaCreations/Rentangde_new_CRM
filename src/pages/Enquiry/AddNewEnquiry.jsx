import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Table,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Dummy Data
const companies = [
  { name: "EMG", executives: ["Ashok", "Dilip"] },
  { name: "VT Enterprises", executives: ["Rohan", "Dilip"] },
  { name: "Asirwad Banquet", executives: ["Rohan"] },
];

const deliveryDismantleSlots = [
  "Select Delivery & Dismantle Slots",
  "Slot 1: 7:00 AM to 11:00 PM",
  "Slot 2: 11:00 PM to 11:45 PM",
  "Slot 3: 7:30 AM to 4:00 PM",
];

const subCategories = [
  "Sofa",
  "Diwan and Benches",
  "Dinning Table",
  "Center Table",
  "Side Tables",
  "Bench & Chairs",
  "Boho",
  "Console Table",
  "Others",
];

// Dummy products with images and subcategories
const allProducts = [
  // ...same as before...
  {
    id: 1,
    name: "Chesserterfield (3 seater)",
    subCategory: "Sofa",
    stock: 8,
    price: 5000,
    img: "https://i.imgur.com/8zQZQ7g.png",
  },
  {
    id: 2,
    name: "Vintage Pink Sofa (1 Seater)",
    subCategory: "Sofa",
    stock: 5,
    price: 2000,
    img: "https://i.imgur.com/8zQZQ7g.png",
  },
  {
    id: 3,
    name: "Classic Diwan",
    subCategory: "Diwan and Benches",
    stock: 4,
    price: 3500,
    img: "https://i.imgur.com/8zQZQ7g.png",
  },
  {
    id: 4,
    name: "Modern Bench",
    subCategory: "Diwan and Benches",
    stock: 106,
    price: 1800,
    img: "https://i.imgur.com/8zQZQ7g.png",
  },
  {
    id: 5,
    name: "Dining Table Classic",
    subCategory: "Dinning Table",
    stock: 3,
    price: 7000,
    img: "https://i.imgur.com/8zQZQ7g.png",
  },
  {
    id: 6,
    name: "Round Dining Table",
    subCategory: "Dinning Table",
    stock: 2,
    price: 6500,
    img: "https://i.imgur.com/8zQZQ7g.png",
  },
  {
    id: 7,
    name: "Glass Center Table",
    subCategory: "Center Table",
    stock: 5,
    price: 2200,
    img: "https://i.imgur.com/8zQZQ7g.png",
  },
  {
    id: 8,
    name: "Wooden Center Table",
    subCategory: "Center Table",
    stock: 4,
    price: 2500,
    img: "https://i.imgur.com/8zQZQ7g.png",
  },
  {
    id: 9,
    name: "Round Side Table",
    subCategory: "Side Tables",
    stock: 7,
    price: 900,
    img: "https://i.imgur.com/8zQZQ7g.png",
  },
  {
    id: 10,
    name: "Square Side Table",
    subCategory: "Side Tables",
    stock: 6,
    price: 950,
    img: "https://i.imgur.com/8zQZQ7g.png",
  },
  {
    id: 11,
    name: "Bench Modern",
    subCategory: "Bench & Chairs",
    stock: 6,
    price: 1200,
    img: "https://i.imgur.com/8zQZQ7g.png",
  },
  {
    id: 12,
    name: "Classic Chair",
    subCategory: "Bench & Chairs",
    stock: 10,
    price: 800,
    img: "https://i.imgur.com/8zQZQ7g.png",
  },
  {
    id: 13,
    name: "Boho Puffy Small",
    subCategory: "Boho",
    stock: 8,
    price: 1000,
    img: "https://i.imgur.com/8zQZQ7g.png",
  },
  {
    id: 14,
    name: "Boho Sofa (s shape 2 seater)",
    subCategory: "Boho",
    stock: 209,
    price: 4500,
    img: "https://i.imgur.com/8zQZQ7g.png",
  },
  {
    id: 15,
    name: "Modern Console Table",
    subCategory: "Console Table",
    stock: 3,
    price: 3200,
    img: "https://i.imgur.com/8zQZQ7g.png",
  },
  {
    id: 16,
    name: "Classic Console Table",
    subCategory: "Console Table",
    stock: 2,
    price: 3000,
    img: "https://i.imgur.com/8zQZQ7g.png",
  },
  {
    id: 17,
    name: "Flower Stand",
    subCategory: "Others",
    stock: 10,
    price: 600,
    img: "https://i.imgur.com/8zQZQ7g.png",
  },
  {
    id: 18,
    name: "Magazine Rack",
    subCategory: "Others",
    stock: 5,
    price: 700,
    img: "https://i.imgur.com/8zQZQ7g.png",
  },
];

const ENQUIRY_PRODUCTS_KEY = "enquiry_selected_products";

function getStoredProducts() {
  try {
    const data = localStorage.getItem(ENQUIRY_PRODUCTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setStoredProducts(products) {
  localStorage.setItem(ENQUIRY_PRODUCTS_KEY, JSON.stringify(products));
}

const AddNewEnquiry = () => {
  const navigate = useNavigate();
  // Form state
  const [company, setCompany] = useState("");
  const [executive, setExecutive] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [dismantleDate, setDismantleDate] = useState("");
  const [venue, setVenue] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  // Selected products (persisted)
  const [selectedProducts, setSelectedProducts] = useState(getStoredProducts());

  // Filtered products for dropdown (only show for selected subcategory)
  const filteredProducts = allProducts.filter(
    (p) =>
      subCategory &&
      p.subCategory === subCategory &&
      p.name.toLowerCase().includes(productSearch.toLowerCase()) &&
      !selectedProducts.some((sp) => sp.id === p.id)
  );

  // Update executives when company changes
  useEffect(() => {
    const comp = companies.find((c) => c.name === company);
    if (comp && !comp.executives.includes(executive)) {
      setExecutive("");
    }
  }, [company]);

  // Persist selected products
  useEffect(() => {
    setStoredProducts(selectedProducts);
  }, [selectedProducts]);

  // Grand total calculation
  const grandTotal = selectedProducts.reduce(
    (sum, p) => sum + (parseInt(p.qty, 10) || 1) * p.price,
    0
  );

  // Add product to selection
  const handleSelectProduct = (product) => {
    setSelectedProducts((prev) => [
      ...prev,
      { ...product, qty: 1, total: product.price },
    ]);
    setProductSearch("");
  };

  // Remove product
  const handleRemoveProduct = (id) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Change quantity (no validation, allow any value)
  const handleQtyChange = (id, qty) => {
    let val = qty.replace(/[^0-9]/g, "");
    if (val === "" || parseInt(val, 10) < 1) val = "1";
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              qty: val,
              total: (parseInt(val, 10) || 1) * p.price,
            }
          : p
      )
    );
  };
  // Handle product dropdown open/close
  const handleProductDropdown = (open) => {
    setShowProductDropdown(open);
    setProductSearch("");
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Enquiry submitted!");
    setSelectedProducts([]);
    setStoredProducts([]);
    navigate("/enquiry-list");
  };

  return (
    <Container className="my-4" style={{ fontSize: 14 }}>
      <Card className="shadow-sm">
        <Card.Body>
          <h4
            className="mb-4"
            style={{ fontWeight: 700, fontSize: 20, color: "#2d3e50" }}
          >
            Create Enquiry
          </h4>
          <Form onSubmit={handleSubmit}>
            {/* Section 1: Client & Event Info */}
            <Card className="mb-4 border-0" style={{ background: "#f8fafc" }}>
              <Card.Body>
                <Row className="g-3">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Company Name</Form.Label>
                      <Form.Select
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      >
                        <option value="">Select Company Name</option>
                        {companies.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={2} className="d-flex align-items-end ">
                    <Button
                      size="sm"
                      style={{
                        backgroundColor: "#323D4F",
                        border: "none",
                        width: "100%",
                        transition: "background 0.2s",
                      }}
                      className="w-100 add-btn"
                    >
                      Add Client
                    </Button>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Executive Name</Form.Label>
                      <Form.Select
                        value={executive}
                        onChange={(e) => setExecutive(e.target.value)}
                        disabled={!company}
                      >
                        <option value="">Select Executive Name</option>
                        {company &&
                          companies
                            .find((c) => c.name === company)
                            .executives.map((ex) => (
                              <option key={ex} value={ex}>
                                {ex}
                              </option>
                            ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="g-3 mt-2">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Delivery Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Dismantle Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={dismantleDate}
                        onChange={(e) => setDismantleDate(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Select Slot</Form.Label>
                      <Form.Select
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                      >
                        {deliveryDismantleSlots.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mt-4">
                  <Form.Label>Venue Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Section 2: Product Selection */}
            <Card className="mb-4 border-0" style={{ background: "#f8fafc" }}>
              <Card.Body>
                <Row className="g-3 align-items-end">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Sub Category</Form.Label>
                      <Form.Select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                      >
                        <option value="">Select Sub Category</option>
                        {subCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={8}>
                    <Form.Group>
                      <Form.Label>Select Products</Form.Label>
                      <div
                        className="border rounded px-2 py-1 bg-white"
                        style={{
                          minHeight: 38,
                          cursor: subCategory ? "pointer" : "not-allowed",
                          position: "relative",
                        }}
                        tabIndex={0}
                        onClick={() =>
                          subCategory && handleProductDropdown(true)
                        }
                        onBlur={() =>
                          setTimeout(() => handleProductDropdown(false), 200)
                        }
                      >
                        {/* Selected products as tags */}
                        {selectedProducts.map((p) => (
                          <span
                            key={p.id}
                            className="badge bg-light text-dark border me-2 mb-1"
                            style={{
                              fontWeight: 500,
                              fontSize: 13,
                              display: "inline-flex",
                              alignItems: "center",
                            }}
                          >
                            {p.name}
                            <span
                              style={{
                                marginLeft: 6,
                                cursor: "pointer",
                                color: "#d00",
                                fontWeight: "bold",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveProduct(p.id);
                              }}
                            >
                              ×
                            </span>
                          </span>
                        ))}
                        <input
                          type="text"
                          className="border-0"
                          style={{
                            outline: "none",
                            fontSize: 13,
                            minWidth: 80,
                            background: "transparent",
                          }}
                          placeholder={
                            subCategory
                              ? "Select products"
                              : "Select sub category first"
                          }
                          value={productSearch}
                          onChange={(e) => setProductSearch(e.target.value)}
                          onFocus={() =>
                            subCategory && handleProductDropdown(true)
                          }
                          disabled={!subCategory}
                        />
                        {/* Dropdown */}
                        {showProductDropdown &&
                          filteredProducts.length > 0 &&
                          subCategory && (
                            <div
                              className="shadow"
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                right: 0,
                                zIndex: 10,
                                background: "#fff",
                                maxHeight: 220,
                                overflowY: "auto",
                                border: "1px solid #eee",
                              }}
                            >
                              {filteredProducts.map((prod) => (
                                <div
                                  key={prod.id}
                                  className="d-flex align-items-center px-2 py-1"
                                  style={{
                                    cursor: "pointer",
                                    borderBottom: "1px solid #f5f5f5",
                                    fontSize: 13,
                                  }}
                                  onClick={() => handleSelectProduct(prod)}
                                >
                                  <img
                                    src={prod.img}
                                    alt={prod.name}
                                    style={{
                                      width: 36,
                                      height: 28,
                                      objectFit: "cover",
                                      borderRadius: 4,
                                      marginRight: 10,
                                      border: "1px solid #eee",
                                    }}
                                  />
                                  <span>{prod.name}</span>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Section 3: Products Table */}
            <Card className="mb-4 border-0" style={{ background: "#f8fafc" }}>
              <Card.Body>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>
                  Products
                </div>
                <div className="table-responsive">
                  <Table
                    bordered
                    hover
                    size="sm"
                    style={{ fontSize: 14, background: "#fff" }}
                  >
                    <thead className="table-light">
                      <tr>
                        <th>Product Name</th>
                        <th>Stock</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProducts.length > 0 ? (
                        selectedProducts.map((p) => (
                          <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.stock}</td>
                            <td style={{ width: 90 }}>
                              <Form.Control
                                type="number"
                                min={1}
                                value={p.qty}
                                onChange={(e) =>
                                  handleQtyChange(p.id, e.target.value)
                                }
                                style={{ fontSize: 14, padding: "2px 6px" }}
                              />
                            </td>
                            <td>₹{p.price}</td>
                            <td>₹{(parseInt(p.qty, 10) || 1) * p.price}</td>
                            <td>
                              <Button
                                variant="link"
                                size="sm"
                                style={{ color: "#d00", fontSize: 14 }}
                                onClick={() => handleRemoveProduct(p.id)}
                              >
                                Remove
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center text-muted">
                            No products selected.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>

            {/* Section 4: Grand Total & Actions */}
            <Row className="align-items-center mb-3">
              <Col md={4}>
                <div style={{ fontWeight: 500, fontSize: 15 }}>
                  Grand Total <span style={{ color: "red" }}>*</span>
                </div>
                <Form.Control
                  type="text"
                  value={grandTotal}
                  readOnly
                  style={{
                    maxWidth: 200,
                    fontWeight: 600,
                    fontSize: 16,
                    marginTop: 4,
                  }}
                />
              </Col>
              <Col
                md={8}
                className="d-flex justify-content-end gap-2 mt-3 mt-md-0"
              >
                {/* <Button
                  variant="secondary"
                  type="button"
                  style={{ fontSize: 14 }}
                >
                  Close
                </Button> */}
                <Button
                  size="sm"
                  style={{
                    backgroundColor: "#323D4F",
                    border: "none",
                    transition: "background 0.2s",
                  }}
                  className=" add-btn"
                  type="submit"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddNewEnquiry;
