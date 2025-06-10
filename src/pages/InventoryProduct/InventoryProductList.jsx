import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const InventoryProduct = () => {
  const [deliveryDate, setDeliveryDate] = useState("");
  const [dismantleDate, setDismantleDate] = useState("");

  const handleFetchInventory = () => {
    alert(`Fetching inventory for:
    - Delivery Date: ${deliveryDate || "Not selected"}
    - Dismantle Date: ${dismantleDate || "Not selected"}`);
    
    // You can replace the above with actual fetch logic
  };

  return (
    <Container className="my-4">
      <Card className="shadow-sm p-4">
        <h5 className="mb-4 text-dark">Filter Inventory</h5>
        <Row className="g-3 align-items-end">
          <Col md={4}>
            <Form.Group controlId="deliveryDate">
              <Form.Label style={{ fontSize: "14px" }}>Delivery Date</Form.Label>
              <Form.Control
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                size="sm"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="dismantleDate">
              <Form.Label style={{ fontSize: "14px" }}>Dismantle Date</Form.Label>
              <Form.Control
                type="date"
                value={dismantleDate}
                onChange={(e) => setDismantleDate(e.target.value)}
                size="sm"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Button
              variant="success"
              size="sm"
              className="w-100"
              onClick={handleFetchInventory}
            >
              Fetch Filtered Inventory
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default InventoryProduct;
