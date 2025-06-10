import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap";
import { FaUpload, FaDownload, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const subCategoryOptions = {
  Furniture: [
    "Sofa",
    "Chair",
    "Table",
    "Bed",
    "Wardrobe",
    "Dining Table",
    "Bench",
    "Console Table",
    "Others",
  ],
  "Home Decor": ["Wall Art", "Rug", "Curtains", "Lamp"],
};

const AddProduct = () => {
  const naviagte = useNavigate();
  const [productData, setProductData] = useState({
    productName: "",
    category: "",
    subCategory: "",
    availableStock: "",
    pricing: "",
    sizeAndWeight: "",
    quantity: "",
    minQuantity: "",
    seater: "",
    color: "",
    material: "",
    description: "",
    productIcon: null,
  });

  const [iconPreview, setIconPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [excelFile, setExcelFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" ? { subCategory: "" } : {}),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData((prev) => ({ ...prev, productIcon: file }));
      setIconPreview(URL.createObjectURL(file));
    }
  };

  const handleExcelChange = (e) => {
    const file = e.target.files[0];
    setExcelFile(file);
    // Add logic to parse/upload excel file here
  };

  // Download template with required columns as per your screenshot
  const handleDownloadTemplate = () => {
    const csvContent =
      "ProductName,ProductDesc,ProductCategory,ProductSubcategory,ProductStock,ProductPrice,seater,Material,ProductSize,Color,qty,minqty\n";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "product_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExcelAdd = () => {
    // Add logic to add products from excel
    alert("Excel data added (demo)");
    setExcelFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("Product added successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
    setProductData({
      productName: "",
      category: "",
      subCategory: "",
      availableStock: "",
      pricing: "",
      sizeAndWeight: "",
      quantity: "",
      minQuantity: "",
      seater: "",
      color: "",
      material: "",
      description: "",
      productIcon: null,
    });
    setIconPreview(null);
    naviagte("/prdoduct-management");
  };

  return (
    <Container className="my-5">
      <Card className="shadow-lg border-0 rounded-4">
        {/* Top Bar with Excel Buttons and Add Excel Data */}
        <div
          className="py-3 px-4 rounded-top"
          style={{
            background: "linear-gradient(90deg, #323D4F, rgb(154, 155, 156))",
            color: "#fff",
          }}
        >
          <h4 className="mb-0 flex-grow-1" style={{ fontSize: 18 }}>
            Add New Product
          </h4>
          <div className="pt-4 rounded-top d-flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="d-flex flex-wrap align-items-center gap-2">
              <Button
                variant="outline-light"
                className="d-flex align-items-center gap-2"
                onClick={handleDownloadTemplate}
                size="sm"
                style={{ fontSize: 14 }}
              >
                <FaDownload /> Download Excel
              </Button>
              <Form.Label
                htmlFor="excel-upload"
                className="btn btn-outline-light d-flex align-items-center gap-2 mb-0"
                style={{ cursor: "pointer", fontSize: 14 }}
              >
                <FaUpload /> Upload Excel
                <Form.Control
                  type="file"
                  id="excel-upload"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleExcelChange}
                  style={{ display: "none" }}
                />
              </Form.Label>
              {excelFile && (
                <span style={{ fontSize: 12, color: "#fff" }}>
                  {excelFile.name}
                </span>
              )}
            </div>
            <Button
              variant="success"
              className="d-flex align-items-center gap-2"
              onClick={handleExcelAdd}
              size="sm"
              disabled={!excelFile}
              style={{ fontSize: 14 }}
            >
              <FaPlus /> Add Excel Data
            </Button>
          </div>
        </div>

        <Card.Body className="p-4">
          <Form
            onSubmit={handleSubmit}
            style={{ fontSize: "14px" }}
            autoComplete="off"
          >
            {/* Product Name */}
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: 14 }}>
                Product Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={productData.productName}
                onChange={handleChange}
                required
                className="rounded-3 shadow-sm"
                style={{ fontSize: 14 }}
              />
            </Form.Group>

            {/* Category + Subcategory */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label style={{ fontSize: 14 }}>
                  Category <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  required
                  className="rounded-3 shadow-sm"
                  style={{ fontSize: 14 }}
                >
                  <option value="">Select Category</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Home Decor">Home Decor</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label style={{ fontSize: 14 }}>
                  Subcategory <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="subCategory"
                  value={productData.subCategory}
                  onChange={handleChange}
                  required
                  className="rounded-3 shadow-sm"
                  style={{ fontSize: 14 }}
                  disabled={!productData.category}
                >
                  <option value="">Select Subcategory</option>
                  {productData.category &&
                    subCategoryOptions[productData.category]?.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                </Form.Select>
              </Col>
            </Row>

            {/* Stock + Pricing + Size & Weight */}
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label style={{ fontSize: 14 }}>
                  Available Stock <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="availableStock"
                  value={productData.availableStock}
                  onChange={handleChange}
                  required
                  className="rounded-3 shadow-sm"
                  style={{ fontSize: 14 }}
                />
              </Col>
              <Col md={4}>
                <Form.Label style={{ fontSize: 14 }}>
                  Pricing <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="pricing"
                  value={productData.pricing}
                  onChange={handleChange}
                  required
                  className="rounded-3 shadow-sm"
                  style={{ fontSize: 14 }}
                />
              </Col>
              <Col md={4}>
                <Form.Label style={{ fontSize: 14 }}>
                  Size & Weight (optional)
                </Form.Label>
                <Form.Control
                  type="text"
                  name="sizeAndWeight"
                  value={productData.sizeAndWeight}
                  onChange={handleChange}
                  className="rounded-3 shadow-sm"
                  style={{ fontSize: 14 }}
                />
              </Col>
            </Row>

            {/* Quantity + Min Quantity + Seater */}
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label style={{ fontSize: 14 }}>
                  Quantity <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={productData.quantity}
                  onChange={handleChange}
                  required
                  className="rounded-3 shadow-sm"
                  style={{ fontSize: 14 }}
                />
              </Col>
              <Col md={4}>
                <Form.Label style={{ fontSize: 14 }}>Min Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="minQuantity"
                  value={productData.minQuantity}
                  onChange={handleChange}
                  className="rounded-3 shadow-sm"
                  style={{ fontSize: 14 }}
                />
              </Col>
              <Col md={4}>
                <Form.Label style={{ fontSize: 14 }}>
                  Seater (optional)
                </Form.Label>
                <Form.Control
                  type="text"
                  name="seater"
                  value={productData.seater}
                  onChange={handleChange}
                  className="rounded-3 shadow-sm"
                  style={{ fontSize: 14 }}
                />
              </Col>
            </Row>

            {/* Color + Material */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label style={{ fontSize: 14 }}>Color</Form.Label>
                <Form.Control
                  type="text"
                  name="color"
                  value={productData.color}
                  onChange={handleChange}
                  className="rounded-3 shadow-sm"
                  style={{ fontSize: 14 }}
                />
              </Col>
              <Col md={6}>
                <Form.Label style={{ fontSize: 14 }}>Material</Form.Label>
                <Form.Control
                  type="text"
                  name="material"
                  value={productData.material}
                  onChange={handleChange}
                  className="rounded-3 shadow-sm"
                  style={{ fontSize: 14 }}
                />
              </Col>
            </Row>

            {/* Description */}
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: 14 }}>
                Product Description <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                value={productData.description}
                onChange={handleChange}
                required
                className="rounded-3 shadow-sm"
                style={{ fontSize: 14 }}
              />
            </Form.Group>

            {/* Product Icon Upload */}
            <Form.Group className="mb-4">
              <Form.Label style={{ fontSize: 14 }}>
                Upload Product Icon <span className="text-danger">*</span>
              </Form.Label>
              <div className="d-flex align-items-center gap-3">
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="rounded-3 shadow-sm"
                  style={{ fontSize: 14 }}
                />
                <FaUpload style={{ fontSize: "18px", color: "#323D4F" }} />
              </div>
              {iconPreview && (
                <div className="mt-3">
                  <img
                    src={iconPreview}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </Form.Group>

            {/* Add Product Button (Form Data) */}
            <Button
              type="submit"
              className="w-100 py-2 rounded-3"
              style={{
                backgroundColor: "#323D4F",
                border: "none",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              <FaPlus className="mb-1" /> Add Product
            </Button>

            {/* Success Message */}
            {successMessage && (
              <div
                className="text-success text-center mt-3 fade-in"
                style={{ fontSize: "13px", transition: "opacity 0.5s ease-in" }}
              >
                {successMessage}
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddProduct;
