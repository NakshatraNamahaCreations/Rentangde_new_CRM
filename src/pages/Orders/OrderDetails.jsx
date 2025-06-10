import React, { useState } from "react";
import { Card, Table, Button, Row, Col, Modal, Form } from "react-bootstrap";

// Dummy data for demonstration
const dummyOrder = {
  clientId: "67fce299347f10a7e70d4dc3",
  orderId: "68441aaea4ace71e97bb36d1",
  companyName: "nnc",
  contactNumber: "9344533702",
  executiveName: "suman",
  address: "channasandra bus stand",
  orderStatus: "Confirm",
  grandTotal: 4500,
  products: [
    {
      slot: "Slot 3: 7:30 AM , 07-06-2025, to 4:00 PM, 08-06-2025,",
      productName: "Lovett Sofa",
      quantity: 1,
      total: 4500,
      availableStock: 5,
    },
  ],
  refurbishment: [],
};

const labelStyle = {
  color: "#666",
  fontWeight: 500,
  fontSize: 13,
  minWidth: 110,
};
const valueStyle = { color: "#222", fontSize: 13, fontWeight: 400 };

const OrderDetails = () => {
  // For editable quantity and dynamic total
  const [products, setProducts] = useState(
    dummyOrder.products.map((p) => ({
      ...p,
      unitPrice: p.total / p.quantity,
      availableStock: p.availableStock || 10,
    }))
  );

  // Refurbishment modal state
  const [showRefModal, setShowRefModal] = useState(false);
  const [refProduct, setRefProduct] = useState("");
  const [refQty, setRefQty] = useState("");
  const [refPrice, setRefPrice] = useState("");
  const [refDamage, setRefDamage] = useState("");
  const [addedRefProducts, setAddedRefProducts] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [floorManager, setFloorManager] = useState("");

  // Calculate grand total based on products
  const grandTotal = products.reduce((sum, p) => sum + p.total, 0);

  const handleQtyChange = (idx, val) => {
    setProducts((prev) =>
      prev.map((prod, i) => {
        if (i === idx) {
          let qty =
            val === ""
              ? ""
              : Math.max(1, Math.min(Number(val), prod.availableStock));
          return {
            ...prod,
            quantity: qty,
            total: qty === "" ? 0 : qty * prod.unitPrice,
          };
        }
        return prod;
      })
    );
  };

  // Refurbishment modal handlers
  const handleAddRefProduct = () => {
    if (!refProduct || !refQty || !refPrice) return;
    const prod = products.find((p) => p.productName === refProduct);
    setAddedRefProducts((prev) => [
      ...prev,
      {
        productName: refProduct,
        qty: Number(refQty),
        price: refPrice,
        damage: refDamage,
      },
    ]);
    setRefProduct("");
    setRefQty("");
    setRefPrice("");
    setRefDamage("");
  };

  const handleCloseRefModal = () => {
    setShowRefModal(false);
    setRefProduct("");
    setRefQty("");
    setRefPrice("");
    setRefDamage("");
    setAddedRefProducts([]);
    setShippingAddress("");
    setFloorManager("");
  };

  return (
    <div className="p-3" style={{ background: "#f6f8fa", minHeight: "100vh" }}>
      <Card className="shadow-sm mb-4" style={{ borderRadius: 12 }}>
        <Card.Body>
          <h6 className="mb-3" style={{ fontWeight: 700, fontSize: 17 }}>
            Order Details
          </h6>

          <Row className="mb-2">
            <Col xs={12} md={6}>
              <div className="mb-1" style={{ display: "flex", gap: "10px" }}>
                <span style={labelStyle}>Client Id:</span>
                <span style={valueStyle}>{dummyOrder.orderId}</span>
              </div>
              <div className="mb-1" style={{ display: "flex", gap: "10px" }}>
                <span style={labelStyle}>Company Name: </span>
                <span style={valueStyle}>{dummyOrder.companyName}</span>
              </div>
              <div className="mb-1" style={{ display: "flex", gap: "10px" }}>
                <span style={labelStyle}>Phone No: </span>
                <span style={valueStyle}>{dummyOrder.contactNumber}</span>
              </div>
              <div className="mb-1" style={{ display: "flex", gap: "10px" }}>
                <span style={labelStyle}>Executive Name: </span>
                <span style={valueStyle}>{dummyOrder.executiveName}</span>
              </div>
              <div className="mb-1" style={{ display: "flex", gap: "10px" }}>
                <span style={labelStyle}>Address: </span>
                <span style={valueStyle}>{dummyOrder.address}</span>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="mb-1" style={{ display: "flex", gap: "10px" }}>
                <span style={labelStyle}>Order Status: </span>
                <span
                  style={{ ...valueStyle, color: "#1dbf73", fontWeight: 600 }}
                >
                  {dummyOrder.orderStatus}
                </span>
              </div>
              <div className="mb-1" style={{ display: "flex", gap: "10px" }}>
                <span style={labelStyle}>Grand Total: </span>
                <span style={valueStyle}>₹{grandTotal}</span>
              </div>
            </Col>
          </Row>
          <hr className="my-3" />
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span style={{ fontSize: 14, fontWeight: 600 }}>Products</span>
            <Button
              variant="outline-success"
              size="sm"
              style={{ fontSize: 12, padding: "2px 14px" }}
              onClick={() => setShowRefModal(true)}
            >
              Add Refurbishment
            </Button>
          </div>
          <div className="table-responsive mb-3">
            <Table
              bordered
              size="sm"
              style={{ background: "#fff", fontSize: 13, borderRadius: 8 }}
            >
              <thead>
                <tr style={{ background: "#f3f6fa" }}>
                  <th style={{ width: "35%" }}>Slot</th>
                  <th>Product Name</th>
                  <th>Available Stock</th>
                  <th>Selected Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 500, color: "#444" }}>
                      {prod.slot}
                    </td>
                    <td>{prod.productName}</td>
                    <td>
                      <span style={{ color: "#1a73e8", fontWeight: 500 }}>
                        {prod.availableStock}
                      </span>
                    </td>
                    <td>
                      <input
                        type="number"
                        min={1}
                        max={prod.availableStock}
                        value={prod.quantity}
                        style={{
                          width: 60,
                          fontSize: 13,
                          padding: "2px 6px",
                          border: "1px solid #ccc",
                          borderRadius: 4,
                        }}
                        onChange={(e) => {
                          let val = e.target.value.replace(/^0+/, "");
                          handleQtyChange(idx, val === "" ? "" : Number(val));
                        }}
                        onBlur={(e) => {
                          if (e.target.value === "") handleQtyChange(idx, 1);
                        }}
                      />
                    </td>
                    <td>₹{prod.total ? prod.total.toFixed(2) : 0}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="mb-2" style={{ fontWeight: 600, fontSize: 14 }}>
            Refurbishment Details
          </div>
          <div className="table-responsive">
            <Table
              bordered
              size="sm"
              style={{ background: "#fff", fontSize: 13, borderRadius: 8 }}
            >
              <thead>
                <tr style={{ background: "#f3f6fa" }}>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Damage Description</th>
                </tr>
              </thead>
              <tbody>
                {addedRefProducts.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.productName}</td>
                    <td>{item.qty}</td>
                    <td>₹{item.price}</td>
                    <td>{item.damage}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="d-flex flex-wrap gap-2 mt-3">
            <Button
              variant="primary"
              size="sm"
              style={{ fontSize: 13, fontWeight: 600 }}
            >
              Generate Invoice
            </Button>
            <Button
              variant="info"
              size="sm"
              style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}
            >
              Refurbishment Invoice
            </Button>
            <Button
              variant="danger"
              size="sm"
              style={{ fontSize: 13, fontWeight: 600 }}
            >
              Cancel Order
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Refurbishment Modal */}
      <Modal show={showRefModal} onHide={handleCloseRefModal} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: 18, fontWeight: 600 }}>
            Add Refurbishment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label style={{ fontSize: 14, fontWeight: 500 }}>
                Select Product Name <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Select
                value={refProduct}
                onChange={(e) => {
                  setRefProduct(e.target.value);
                  setRefQty("");
                  setRefPrice("");
                  setRefDamage("");
                }}
              >
                <option value="">Select products...</option>
                {products.map((prod, idx) => (
                  <option key={idx} value={prod.productName}>
                    {prod.productName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {refProduct && (
              <div
                className="mb-3"
                style={{
                  background: "#f8f9fa",
                  borderRadius: 8,
                  padding: 10,
                  gap: 10,
                }}
              >
                <div style={{ minWidth: 120, fontWeight: 500 }}>
                  {refProduct}
                </div>
                <div className="d-flex gap-2 my-2">
                  <Form.Control
                    type="number"
                    min={1}
                    max={
                      products.find((p) => p.productName === refProduct)
                        ?.availableStock || 1
                    }
                    placeholder="Quantity"
                    value={refQty}
                    style={{ width: 80, fontSize: 13 }}
                    onChange={(e) => {
                      let maxQty =
                        products.find((p) => p.productName === refProduct)
                          ?.availableStock || 1;
                      let val = e.target.value.replace(/^0+/, "");
                      if (val === "") setRefQty("");
                      else
                        setRefQty(Math.max(1, Math.min(Number(val), maxQty)));
                    }}
                  />
                  <Form.Control
                    type="number"
                    min={1}
                    placeholder="Price"
                    value={refPrice}
                    style={{ width: 80, fontSize: 13 }}
                    onChange={(e) =>
                      setRefPrice(e.target.value.replace(/^0+/, ""))
                    }
                  />
                  <Form.Control
                    type="text"
                    placeholder="Damage"
                    value={refDamage}
                    style={{ width: 100, fontSize: 13 }}
                    onChange={(e) => setRefDamage(e.target.value)}
                  />
                  <Button
                    variant="success"
                    size="sm"
                    style={{ fontWeight: 600, minWidth: 60 }}
                    onClick={handleAddRefProduct}
                    disabled={
                      !refProduct ||
                      !refQty ||
                      !refPrice ||
                      Number(refQty) < 1 ||
                      Number(refPrice) < 1
                    }
                  >
                    Add
                  </Button>
                </div>
              </div>
            )}
            <Form.Group className="mb-2">
              <Form.Label style={{ fontSize: 14, fontWeight: 500 }}>
                Shipping Address <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Enter shipping address"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label style={{ fontSize: 14, fontWeight: 500 }}>
                Floor Manager
              </Form.Label>
              <Form.Control
                type="text"
                value={floorManager}
                onChange={(e) => setFloorManager(e.target.value)}
                placeholder="Enter floor manager"
              />
            </Form.Group>
            <div
              style={{ fontWeight: 600, fontSize: 15, margin: "12px 0 6px" }}
            >
              Added Products
            </div>
            <div className="table-responsive">
              <Table
                bordered
                size="sm"
                style={{ background: "#fff", fontSize: 13 }}
              >
                <thead>
                  <tr style={{ background: "#f3f6fa" }}>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Damage</th>
                  </tr>
                </thead>
                <tbody>
                  {addedRefProducts.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.productName}</td>
                      <td>{item.qty}</td>
                      <td>₹{item.price}</td>
                      <td>{item.damage}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRefModal}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={!shippingAddress || addedRefProducts.length === 0}
            onClick={() => {
              // Submit logic here
              handleCloseRefModal();
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderDetails;
