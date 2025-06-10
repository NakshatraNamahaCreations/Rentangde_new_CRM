// import React, { useState } from "react";
// import { Modal, Button, Form, Card, Table, Container } from "react-bootstrap";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";
// import Pagination from "../../components/Pagination";

// const SubCategory = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [subCategories, setSubCategories] = useState([
//     {
//       id: 1,
//       subCategoryName: "Wedding Photography",
//       categoryId: "1",
//       subCategoryImage: "https://via.placeholder.com/50",
//     },
//     {
//       id: 2,
//       subCategoryName: "Corporate Video",
//       categoryId: "2",
//       subCategoryImage: "https://via.placeholder.com/50",
//     },
//     {
//       id: 3,
//       subCategoryName: "Booth Rental",
//       categoryId: "3",
//       subCategoryImage: "https://via.placeholder.com/50",
//     },
//   ]);
// const [newSubCategory, setNewSubCategory] = useState({
//   subCategoryName: "",
//   subCategoryImage: "",
//   categoryId: "",
// });
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [error, setError] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedRows, setSelectedRows] = useState([]);

//   const categories = [
//     { id: "1", name: "Photography" },
//     { id: "2", name: "Videography" },
//     { id: "3", name: "Selfie Booth" },
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewSubCategory((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setNewSubCategory((prev) => ({
//         ...prev,
//         subCategoryImage: URL.createObjectURL(file),
//       }));
//     }
//   };

//   const handleAddSubCategory = () => {
//     if (
//       newSubCategory.subCategoryName &&
//       newSubCategory.subCategoryImage &&
//       selectedCategory
//     ) {
//       if (isEditing) {
//         const updatedSubCategories = [...subCategories];
//         updatedSubCategories[editingIndex] = {
//           ...newSubCategory,
//           id: subCategories[editingIndex].id,
//           categoryId: selectedCategory,
//         };
//         setSubCategories(updatedSubCategories);
//         setIsEditing(false);
//         setEditingIndex(null);
//       } else {
//         const newId = subCategories.length
//           ? subCategories[subCategories.length - 1].id + 1
//           : 1;
//         setSubCategories([
//           ...subCategories,
//           { ...newSubCategory, id: newId, categoryId: selectedCategory },
//         ]);
//       }
//       setShowModal(false);
//       setNewSubCategory({
//         subCategoryName: "",
//         subCategoryImage: "",
//         categoryId: "",
//       });
//       setSelectedCategory("");
//     } else {
//       setError("Please fill in all fields.");
//     }
//   };

//   const handleEditSubCategory = (index) => {
//     setIsEditing(true);
//     setEditingIndex(index);
//     setNewSubCategory(subCategories[index]);
//     setShowModal(true);
//   };

//   const handleDeleteSubCategory = (index) => {
//     const updatedSubCategories = subCategories.filter((_, i) => i !== index);
//     setSubCategories(updatedSubCategories);
//   };

//   const handleDeleteSelected = () => {
//     const updatedSubCategories = subCategories.filter(
//       (_, index) => !selectedRows.includes(index)
//     );
//     setSubCategories(updatedSubCategories);
//     setSelectedRows([]);
//   };

//   const handleSelectRow = (index) => {
//     const newSelectedRows = [...selectedRows];
//     if (newSelectedRows.includes(index)) {
//       newSelectedRows.splice(newSelectedRows.indexOf(index), 1);
//     } else {
//       newSelectedRows.push(index);
//     }
//     setSelectedRows(newSelectedRows);
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredSubCategories = subCategories.filter((subCategory) =>
//     subCategory.subCategoryName
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase())
//   );

//   return (
//   <Container>
//     <div className="d-flex justify-content-between mb-3">
//       <div>
//         <Form.Control
//           type="text"
//           placeholder="Search Sub-Category"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           className="shadow-sm"
//           style={{ width: "250px", fontSize: "12px" }}
//         />
//       </div>
//       <div className="d-flex gap-2">
//         <Button
//           onClick={() => setShowModal(true)}
//           variant="primary"
//           className="fw-bold rounded-1 shadow-lg"
//           style={{
//             fontSize: "12px",
//             padding: "6px 12px",
//             background: "#5c6bc0",
//             borderColor: "#5c6bc0",
//           }}
//         >
//           + Add Sub-Category
//         </Button>
//         {/* Selected Rows Count */}
//         {selectedRows.length > 0 && (
//           <div className="">
//             <Button
//               variant="outline-danger"
//               onClick={handleDeleteSelected}
//               style={{
//                 fontSize: "12px",
//                 padding: "6px 12px",
//               }}
//             >
//               Delete {selectedRows.length} Selected
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>

//     <Card className="border-0 p-3 shadow-sm">
//       <div
//         className="table-responsive bg-white rounded-lg"
//         style={{ maxHeight: "65vh", overflowY: "auto" }}
//       >
//         <Table
//           className="table table-hover align-middle"
//           style={{
//             borderRadius: "8px",
//             border: "1px solid #e0e0e0",
//             boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <thead
//             className="text-white text-center"
//             style={{ backgroundColor: "#323D4F" }}
//           >
//             <tr>
//               <th className="text-center" style={{ width: "5%" }}>
//                 <input
//                   type="checkbox"
//                   onChange={(e) => {
//                     if (e.target.checked) {
//                       setSelectedRows(
//                         filteredSubCategories.map((_, index) => index)
//                       );
//                     } else {
//                       setSelectedRows([]);
//                     }
//                   }}
//                 />
//               </th>
//               <th className="text-start" style={{ width: "30%" }}>
//                 Sub-Category Name
//               </th>
//               <th className="text-start" style={{ width: "20%" }}>
//                 Category
//               </th>
//               <th className="text-start" style={{ width: "20%" }}>
//                 Sub-Category Image
//               </th>
//               <th className="text-center" style={{ width: "25%" }}>
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredSubCategories.map((subCategory, index) => (
//               <tr key={index} className="text-center hover-row">
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={selectedRows.includes(index)}
//                     onChange={() => handleSelectRow(index)}
//                   />
//                 </td>
//                 <td
//                   className="fw-semibold text-start"
//                   style={{ fontSize: "12px" }}
//                 >
//                   {subCategory.subCategoryName}
//                 </td>
//                 <td
//                   className="fw-semibold text-start"
//                   style={{ fontSize: "12px" }}
//                 >
//                   {
//                     categories.find(
//                       (category) => category.id === subCategory.categoryId
//                     )?.name
//                   }
//                 </td>
//                 <td className="text-start" style={{ fontSize: "12px" }}>
//                   <img
//                     src={subCategory.subCategoryImage}
//                     alt={subCategory.subCategoryName}
//                     style={{
//                       width: "50px",
//                       height: "50px",
//                       objectFit: "cover",
//                       borderRadius: "4px",
//                     }}
//                   />
//                 </td>
//                 <td className="text-center">
//                   <Button
//                     variant="outline-danger"
//                     size="sm"
//                     className="me-2 icon-btn"
//                     style={{
//                       padding: "4px 8px",
//                       fontSize: "10px",
//                     }}
//                   >
//                     <FaTrashAlt
//                       style={{ width: "12px", height: "12px" }}
//                       onClick={() => handleDeleteSubCategory(index)}
//                     />
//                   </Button>
//                   <Button
//                     variant="outline-success"
//                     size="sm"
//                     className="icon-btn"
//                     style={{
//                       padding: "4px 8px",
//                       fontSize: "10px",
//                     }}
//                   >
//                     <FaEdit
//                       style={{ width: "12px", height: "12px" }}
//                       onClick={() => handleEditSubCategory(index)}
//                     />
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </Card>

//     {/* Add/Edit Sub-Category Modal */}
//     <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//       <Modal.Header closeButton>
//         <Modal.Title className="text-black" style={{ fontSize: "16px" }}>
//           {isEditing ? "Edit Sub-Category" : "Add Sub-Category"}
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <p className="text-danger">{error}</p>
//         <Form>
//           <Form.Group className="mb-3">
//             <Form.Label className="fw-semibold" style={{ fontSize: "12px" }}>
//               Sub-Category Name
//             </Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter Sub-Category Name"
//               value={newSubCategory.subCategoryName}
//               onChange={handleChange}
//               className="shadow-sm"
//               name="subCategoryName"
//               style={{ fontSize: "12px" }}
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label className="fw-semibold" style={{ fontSize: "12px" }}>
//               Sub-Category Image
//             </Form.Label>
//             <Form.Control
//               type="file"
//               onChange={handleImageChange}
//               className="shadow-sm"
//               name="subCategoryImage"
//               style={{ fontSize: "12px" }}
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label className="fw-semibold" style={{ fontSize: "12px" }}>
//               Category
//             </Form.Label>
//             <Form.Select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               style={{ fontSize: "12px" }}
//             >
//               <option value="">Select Category</option>
//               {categories.map((category) => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button
//           variant="dark"
//           className="rounded-1"
//           onClick={handleAddSubCategory}
//           style={{ borderColor: "black", background: "black", fontSize: "12px" }}
//         >
//           {isEditing ? "Update" : "Add"}
//         </Button>
//         <Button
//           variant="outline-secondary"
//           className="rounded-1"
//           onClick={() => setShowModal(false)}
//           style={{ fontSize: "12px" }}
//         >
//           Cancel
//         </Button>
//       </Modal.Footer>
//     </Modal>

//     {/* Pagination Component */}
//     <Pagination totalItems={filteredSubCategories.length} />
//   </Container>
// );
// };

// export default SubCategory;

import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Card, Table, Container } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { ApiURL, ImageApiURL } from "../../api";
import Pagination from "../../components/Pagination";

const SubCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [newSubCategory, setNewSubCategory] = useState({
    subcategory: "",
    subcatimg: null,
    category: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getSubcategory();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${ApiURL}/category/getcategory`);
      if (res.status === 200) {
        setCategories(res.data.category);
      }
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  const getSubcategory = async () => {
    try {
      const res = await axios.get(`${ApiURL}/subcategory/getappsubcat`);
      if (res.status === 200) {
        setSubCategories(res.data.subcategory);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSubCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewSubCategory((prev) => ({
        ...prev,
        subcatimg: file,
      }));
    }
  };

  const resetForm = () => {
    setNewSubCategory({ subcategory: "", subcatimg: null, category: "" });
    setSelectedCategory("");
    setError("");
    setIsEditing(false);
    setEditingId(null);
  };

  const handleAddSubCategory = async () => {
    if (
      !newSubCategory.subcategory ||
      (!newSubCategory.subcatimg && !isEditing) ||
      !selectedCategory
    ) {
      setError("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("subcategory", newSubCategory.subcategory);
    formData.append("category", selectedCategory); // category name
    if (newSubCategory.subcatimg) {
      formData.append("subcatimg", newSubCategory.subcatimg);
    }

    try {
      const url = isEditing
        ? `${ApiURL}/subcategory/editappsubcat/${editingId}`
        : `${ApiURL}/subcategory/addappsubcat`;

      const response = isEditing
        ? await axios.put(url, formData)
        : await axios.post(url, formData);

      if (response.status === 200) {
        toast.success(`Successfully ${isEditing ? "updated" : "added"}`);
        getSubcategory();
        resetForm();
        setShowModal(false);
      } else {
        toast.error("Failed to save subcategory");
      }
    } catch (error) {
      console.error(error);
      toast.error("Operation failed");
    }
  };

  const handleEditSubCategory = (subCategory) => {
    setIsEditing(true);
    setEditingId(subCategory._id);
    setNewSubCategory({
      subcategory: subCategory.subcategory,
      subcatimg: null,
      category: subCategory.category,
    });
    setSelectedCategory(subCategory.category);
    setShowModal(true);
    setError("");
  };

  const handleDeleteSubCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        const response = await axios.post(
          `${ApiURL}/subcategory/deleteappsubcat/${id}`
        );
        if (response.status === 200) {
          toast.success("Successfully deleted");
          getSubcategory();
          setSelectedRows((prev) =>
            prev.filter((idx) => subCategories[idx]._id !== id)
          );
        } else {
          toast.error("Failed to delete subcategory");
        }
      } catch (error) {
        console.error(error.message);
        toast.error("Deletion failed");
      }
    }
  };

  const handleDeleteSelected = async () => {
    for (let index of selectedRows) {
      const subCat = filteredSubCategories[index];
      await handleDeleteSubCategory(subCat._id);
    }
    setSelectedRows([]);
  };

  const handleSelectRow = (index) => {
    const newSelectedRows = [...selectedRows];
    if (newSelectedRows.includes(index)) {
      newSelectedRows.splice(newSelectedRows.indexOf(index), 1);
    } else {
      newSelectedRows.push(index);
    }
    setSelectedRows(newSelectedRows);
  };

  const handleSelectAllRows = (checked) => {
    if (checked) {
      setSelectedRows(filteredSubCategories.map((_, i) => i));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredSubCategories = subCategories.filter((subCategory) =>
    (subCategory.subcategory || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <Container>
      {/* Search & Buttons */}
      <div className="d-flex justify-content-between mb-3">
        <Form.Control
          type="text"
          placeholder="Search Sub-Category"
          value={searchQuery}
          onChange={handleSearchChange}
          className="shadow-sm"
          style={{ width: "250px", fontSize: "12px" }}
        />
        <div className="d-flex gap-2">
          <Button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            variant="primary"
            className="fw-semibold "
            style={{
              fontSize: "12px",
              background: "#5c6bc0",
              borderColor: "#5c6bc0",

            }}
          >
            + Add Sub-Category
          </Button>
          {selectedRows.length > 0 && (
            <Button
              variant="outline-danger"
              onClick={handleDeleteSelected}
              style={{ fontSize: "12px" }}
            >
              Delete {selectedRows.length} Selected
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <Card className="border-0 p-3 shadow-sm">
        <div
          className="table-responsive"
          style={{ maxHeight: "65vh", overflowY: "auto" }}
        >
          <Table className="table table-hover align-middle">
            <thead
              className="text-white text-center"
              style={{ backgroundColor: "#323D4F", fontSize: "14px" }}
            >
              <tr>
                <th style={{ width: "5%" }}>
                  <input
                    type="checkbox"
                    onChange={(e) => handleSelectAllRows(e.target.checked)}
                    checked={
                      selectedRows.length === filteredSubCategories.length &&
                      filteredSubCategories.length > 0
                    }
                  />
                </th>
                <th className="text-start">Sub-Category Name</th>
                <th className="text-start">Category</th>
                <th className="text-start">Sub-Category Image</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((subCategory, index) => (
                <tr key={subCategory._id} className="text-center">
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleSelectRow(index)}
                    />
                  </td>
                  <td className="text-start">{subCategory.subcategory}</td>
                  <td className="text-start">{subCategory.category}</td>
                  <td className="text-start">
                    {subCategory.subcatimg ? (
                      <img
                        src={`${ImageApiURL}/subcategory/${subCategory.subcatimg}`}
                        alt={subCategory.subcategory}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="text-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="me-2"
                      onClick={() => handleDeleteSubCategory(subCategory._id)}
                    >
                      <FaTrashAlt />
                    </Button>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleEditSubCategory(subCategory)}
                    >
                      <FaEdit />
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredSubCategories.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center">
                    No sub-categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "16px" }}>
            {isEditing ? "Edit Sub-Category" : "Add Sub-Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-danger">{error}</p>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Sub-Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Sub-Category Name"
                name="subcategory"
                value={newSubCategory.subcategory}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Sub-Category Image {isEditing && "(Optional)"}
              </Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
              {isEditing && newSubCategory.subcatimg && (
                <img
                  src={URL.createObjectURL(newSubCategory.subcatimg)}
                  alt="Preview"
                  style={{ width: "80px", marginTop: "10px" }}
                />
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.category}>
                    {cat.category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleAddSubCategory}>
            {isEditing ? "Update" : "Add"}
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => {
              resetForm();
              setShowModal(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Pagination
        totalItems={filteredSubCategories.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
};

export default SubCategory;
