import React, { useMemo } from "react";
import { Button, Card, Container, Form, Table } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

// Dummy data (reuse from EnquiryList)
const dummyEnquiries = [
  {
    id: 537,
    enquiryDate: "07-06-2025",
    time: "Slot 2: 11:00 AM",
    enqTime: "2025-06-07T11:00:00",
    companyName: "nnc",
    executiveName: "suman",
    grandTotal: 2000,
  },
  {
    id: 536,
    enquiryDate: "06-06-2025",
    time: "Slot 3: 7:30 AM",
    enqTime: "2025-06-06T07:30:00",
    companyName: "nnc",
    executiveName: "suman",
    grandTotal: 20850,
  },
  {
    id: 535,
    enquiryDate: "06-06-2025",
    time: "Slot 1: 7:00 AM",
    enqTime: "2025-06-06T07:00:00",
    companyName: "nnc",
    executiveName: "suman",
    grandTotal: 2000,
  },
  {
    id: 534,
    enquiryDate: "06-06-2025",
    time: "Slot 3: 7:30 AM",
    enqTime: "2025-06-06T07:30:00",
    companyName: "nnc",
    executiveName: "suman",
    grandTotal: 2000,
  },
  {
    id: 533,
    enquiryDate: "06-06-2025",
    time: "Slot 3: 7:30 AM",
    enqTime: "2025-06-06T07:30:00",
    companyName: "nnc",
    executiveName: "suman",
    grandTotal: 4000,
  },
  {
    id: 532,
    enquiryDate: "07-06-2025",
    time: "Slot 2: 11:00 AM",
    enqTime: "2025-06-07T11:00:00",
    companyName: "VT Enterprises",
    executiveName: "Dilip",
    grandTotal: 2550040000,
  },
  {
    id: 531,
    enquiryDate: "10-06-2025",
    time: "Slot 1: 7:00 AM",
    enqTime: "2025-06-10T07:00:00",
    companyName: "Asirwad Banquet",
    executiveName: "Rohan",
    grandTotal: 10000,
  },
  {
    id: 530,
    enquiryDate: "19-06-2025",
    time: "Slot 1: 7:00 AM",
    enqTime: "2025-06-19T07:00:00",
    companyName: "VT Enterprises",
    executiveName: "Dilip",
    grandTotal: 10000,
  },
];

const EnquiryByDate = () => {
  const { date } = useParams();
  const navigate = useNavigate();

  // Filter enquiries for this date
  const filtered = useMemo(
    () => dummyEnquiries.filter((e) => e.enquiryDate === date),
    [date]
  );

  return (
    <Container className="my-4">
      <Card className="shadow-sm mb-4">
        <Card.Body className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0" style={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Enquiries on {date}
          </h5>
          <Button
            size="sm"
            style={{
              backgroundColor: "#323D4F",
              border: "none",
              transition: "background 0.2s",
            }}
            onClick={() => navigate("/enquiry-calender")}
            className="add-btn"
          >
            Back to Calendar
          </Button>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <div className="table-responsive">
            <Table
              striped
              bordered
              hover
              className="mb-0"
              style={{ fontSize: "0.82rem" }}
            >
              <thead style={{ background: "#f8f9fa" }}>
                <tr>
                  <th style={{ width: "5%" }}>S.No.</th>
                  <th style={{ width: "10%" }}>Enquiry Date</th>
                  <th style={{ width: "12%" }}>Time</th>
                  <th style={{ width: "18%" }}>Enq Time</th>
                  <th style={{ width: "18%" }}>Company Name</th>
                  <th style={{ width: "15%" }}>Executive Name</th>
                  <th style={{ width: "10%" }}>GrandTotal</th>
                  <th style={{ width: "12%" }} className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((enq) => (
                  <tr key={enq.id}>
                    <td>{enq.id}</td>
                    <td>{enq.enquiryDate}</td>
                    <td>{enq.time}</td>
                    <td>{enq.enqTime}</td>
                    <td>{enq.companyName}</td>
                    <td>{enq.executiveName}</td>
                    <td>{enq.grandTotal}</td>
                    <td className="text-center">
                      <Button
                        variant="outline-dark"
                        size="sm"
                        className="icon-btn"
                        style={{ padding: "4px 8px", fontSize: "10px" }}
                        onClick={() => navigate(`/enquiry-details/`)}
                      >
                        <MdVisibility />
                      </Button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center text-muted">
                      No enquiries found for this date.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EnquiryByDate;