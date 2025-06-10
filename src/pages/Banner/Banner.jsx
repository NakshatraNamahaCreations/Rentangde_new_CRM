import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Card, Table, Container } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ApiURL, ImageApiURL } from "../../api";
import Pagination from "../../components/Pagination";
import axios from "axios";
import { toast } from "react-toastify";

const Banner = () => {
  const [showModal, setShowModal] = useState(false);
  const [banners, setBanners] = useState([]);
  const [newBanner, setNewBanner] = useState({ banner: null });
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const res = await axios.get(`${ApiURL}/banner/getallbanner`);
      if (res.status === 200) {
        setBanners(res.data.banner || []);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
      toast.error("Failed to fetch banners");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBanner({ banner: file });
    }
  };

  const handleAddBanner = async () => {
    if (!newBanner.banner) {
      setError("Please select a banner image.");
      return;
    }

    const formData = new FormData();
    formData.append("banner", newBanner.banner);

    try {
      const res = await axios.post(`${ApiURL}/banner/addbanner`, formData);
      if (res.status === 200) {
        toast.success("Banner uploaded successfully");
        fetchBanner();
        setShowModal(false);
        setNewBanner({ banner: null });
        setError("");
      } else {
        toast.error("Failed to upload banner");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Failed to upload banner.");
    }
  };

  const handleDeleteBanner = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    try {
      const res = await axios.post(`${ApiURL}/banner/deletebanner/${id}`);
      if (res.status === 200) {
        toast.success("Banner deleted successfully");
        fetchBanner();
      } else {
        toast.error("Failed to delete banner");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Deletion failed.");
    }
  };

  const handleDeleteSelected = () => {
    selectedRows.forEach((index) => {
      const id = filteredBanners[index]._id;
      handleDeleteBanner(id);
    });
    setSelectedRows([]);
  };

  const handleSelectRow = (index) => {
    const updated = selectedRows.includes(index)
      ? selectedRows.filter((i) => i !== index)
      : [...selectedRows, index];
    setSelectedRows(updated);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredBanners = banners.filter((banner) =>
    (banner.banner || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBanners = filteredBanners.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container style={{ background: "#F4F4F4", paddingBlock: "20px" }}>
      <div className="d-flex justify-content-between mb-3">
        <Form.Control
          type="text"
          placeholder="Search Banner"
          value={searchQuery}
          onChange={handleSearchChange}
          className="shadow-sm"
          style={{ width: "250px", fontSize: "12px" }}
        />
        <div className="d-flex gap-2">
          <Button
            onClick={() => setShowModal(true)}
            variant="primary"
            style={{ fontSize: "12px" }}
          >
            + Add Banner
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

      <Card className="border-0 p-3 shadow-sm">
        <div className="table-responsive bg-white rounded-lg" style={{ maxHeight: "65vh", overflowY: "auto" }}>
          <Table className="table table-hover align-middle">
            <thead className="text-white text-center" style={{ backgroundColor: "#323D4F" }}>
              <tr>
                <th style={{ width: "5%" }}>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setSelectedRows(
                        e.target.checked ? currentBanners.map((_, i) => i) : []
                      )
                    }
                    checked={
                      selectedRows.length === currentBanners.length &&
                      currentBanners.length > 0
                    }
                  />
                </th>
                <th className="text-start">Banner</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBanners.map((banner, index) => (
                <tr key={banner._id} className="text-center">
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleSelectRow(index)}
                    />
                  </td>
                  <td className="text-start">
                    {banner.banner ? (
                      <img
                        src={`${ImageApiURL}/userbanner/${banner.banner}`}
                        alt="Banner"
                        style={{ width: "200px", height: "70px", objectFit: "cover" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="text-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteBanner(banner._id)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              ))}
              {currentBanners.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center">
                    No banners found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card>

      <Pagination
        totalItems={filteredBanners.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "16px" }}>Add Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-danger">{error}</p>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Banner Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleAddBanner}>
            Upload
          </Button>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Banner;
