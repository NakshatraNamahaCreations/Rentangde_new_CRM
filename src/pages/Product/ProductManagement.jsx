import React, { useState } from "react";
import { Button, Card, Table, Container, Modal, Form } from "react-bootstrap";
import Pagination from "../../components/Pagination";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductManagement = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      productIcon: "https://via.placeholder.com/50",
      productName: "Testing",
      stock: 2,
      pricing: 222,
      seater: "N/A",
      material: "N/A",
      description: "Testing",
    },
    {
      id: 2,
      productIcon: "https://via.placeholder.com/50",
      productName: "Test Product",
      stock: 5,
      pricing: 500,
      seater: "N/A",
      material: "Wood",
      description: "A test product.",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    productName: "",
    productIcon: "",
    stock: "",
    pricing: "",
    seater: "",
    material: "",
    description: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // Handle text input changes (for product details)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle product icon file input
  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        productIcon: URL.createObjectURL(file), // Create URL for the uploaded image
      }));
    }
  };

  // Handle adding or updating a product
  const handleAddProduct = () => {
    if (
      newProduct.productName &&
      newProduct.productIcon &&
      newProduct.stock &&
      newProduct.pricing
    ) {
      if (isEditing) {
        const updatedProducts = [...products];
        updatedProducts[editingIndex] = {
          ...newProduct,
          id: products[editingIndex].id,
        };
        setProducts(updatedProducts);
        setIsEditing(false);
        setEditingIndex(null);
      } else {
        const newId = products.length
          ? products[products.length - 1].id + 1
          : 1;
        setProducts([...products, { ...newProduct, id: newId }]);
      }
      setShowModal(false);
      setNewProduct({
        productName: "",
        productIcon: "",
        stock: "",
        pricing: "",
        seater: "",
        material: "",
        description: "",
      });
    } else {
      setError("Please fill in all required fields.");
    }
  };

  // Handle editing a product
  const handleEditProduct = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
    setNewProduct(products[index]);
    setShowModal(true);
  };

  // Handle deleting a product
  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  // Handle deleting selected products
  const handleDeleteSelected = () => {
    const updatedProducts = products.filter(
      (_, index) => !selectedRows.includes(index)
    );
    setProducts(updatedProducts);
    setSelectedRows([]);
  };

  // Handle checkbox selection
  const handleSelectRow = (index) => {
    const newSelectedRows = [...selectedRows];
    if (newSelectedRows.includes(index)) {
      newSelectedRows.splice(newSelectedRows.indexOf(index), 1);
    } else {
      newSelectedRows.push(index);
    }
    setSelectedRows(newSelectedRows);
  };

  // Handle Select All checkbox
  const handleSelectAll = () => {
    if (selectedRows.length === filteredProducts.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(products.map((_, index) => index));
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container style={{ background: "#F4F4F4", paddingBlock:"20px" }}>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <Form.Control
            type="text"
            placeholder="Search Product"
            value={searchQuery}
            onChange={handleSearchChange}
            className="shadow-sm"
            style={{ width: "250px", fontSize: "12px" }}
          />
        </div>
        <div className="d-flex gap-2">
          <Button
            onClick={() => navigate("/add-product")}
            variant="primary"
            className="fw-bold rounded-1 shadow-lg"
            style={{
              fontSize: "12px",
              padding: "6px 12px",
              background: "#5c6bc0",
              borderColor: "#5c6bc0",
            }}
          >
            + Add Product
          </Button>
          {/* Selected Rows Count */}
          {selectedRows.length > 0 && (
            <div>
              <Button
                variant="outline-danger"
                onClick={handleDeleteSelected}
                style={{
                  fontSize: "12px",
                  padding: "6px 12px",
                }}
              >
                Delete {selectedRows.length} Selected
              </Button>
            </div>
          )}
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <div
          className="table-responsive bg-white rounded-lg"
          style={{ maxHeight: "65vh", overflowY: "auto" }}
        >
          <Table
            className="table table-hover align-middle"
            style={{
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <thead
              className="text-white text-center"
              style={{ backgroundColor: "#323D4F", fontSize:"12px" }}
            >
              <tr>
                <th className="" style={{ width: "5%" }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.length === filteredProducts.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="text-start" style={{ width: "15%" }}>
                  Product Image
                </th>
                <th className="text-start" style={{ width: "20%" }}>
                  Product Name
                </th>
                <th className="text-start" style={{ width: "10%" }}>
                  Stock
                </th>
                <th className="text-start" style={{ width: "10%" }}>
                  Pricing
                </th>
                <th className="text-start" style={{ width: "10%" }}>
                  Seater
                </th>
                <th className="text-start" style={{ width: "10%" }}>
                  Material
                </th>
                <th className="text-start" style={{ width: "10%" }}>
                  Description
                </th>
                <th className="text-center" style={{ width: "10%" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={index} className="text-center hover-row">
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleSelectRow(index)}
                    />
                  </td>
                  <td>
                    <img
                      src={product.productIcon}
                      alt={product.productName}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  </td>
                  <td
                    className="fw-semibold text-start"
                    style={{ fontSize: "12px" }}
                  >
                    {product.productName}
                  </td>
                  <td className="text-start" style={{ fontSize: "12px" }}>
                    {product.stock}
                  </td>
                  <td className="text-start" style={{ fontSize: "12px" }}>
                    {product.pricing}
                  </td>
                  <td className="text-start" style={{ fontSize: "12px" }}>
                    {product.seater}
                  </td>
                  <td className="text-start" style={{ fontSize: "12px" }}>
                    {product.material}
                  </td>
                  <td className="text-start" style={{ fontSize: "12px" }}>
                    {product.description}
                  </td>
                  <td className="text-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="me-2 icon-btn"
                      style={{ padding: "4px 8px", fontSize: "10px" }}
                      onClick={() => handleDeleteProduct(index)}
                    >
                      <FaTrashAlt style={{ width: "12px", height: "12px" }} />
                    </Button>
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="icon-btn"
                      style={{ padding: "4px 8px", fontSize: "10px" }}
                      onClick={() => handleEditProduct(index)}
                    >
                      <FaEdit style={{ width: "12px", height: "12px" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* Pagination Component */}
      <Pagination totalItems={filteredProducts.length} />
    </Container>
  );
};

export default ProductManagement;
