import React, { useState } from "react";
import { Button, Card, Container, Form, Table } from "react-bootstrap";
import moment from "moment";
import { FaTrashAlt, FaFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Pagination from "../../components/Pagination";

const dummyPayments = [
  {
    id: 1,
    quotationId: "QTN001",
    grandTotal: 20000,
    advanceAmount: 5000,
    paymentMode: "Online",
    status: "Paid",
    paymentDate: "2025-06-06T10:00:00",
  },
  {
    id: 2,
    quotationId: "QTN002",
    grandTotal: 15000,
    advanceAmount: 3000,
    paymentMode: "Cash",
    status: "Pending",
    paymentDate: "2025-06-07T14:30:00",
  },
  {
    id: 3,
    quotationId: "QTN003",
    grandTotal: 8000,
    advanceAmount: 2000,
    paymentMode: "Bank Transfer",
    status: "Paid",
    paymentDate: "2025-06-08T09:45:00",
  },
];

const PaymentReport = () => {
  const [payments, setPayments] = useState(dummyPayments);
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const filteredPayments = payments.filter((payment) => {
    const query = searchQuery.toLowerCase();
    const isMatch =
      payment.quotationId.toLowerCase().includes(query) ||
      String(payment.grandTotal).includes(query) ||
      String(payment.advanceAmount).includes(query) ||
      payment.paymentMode.toLowerCase().includes(query) ||
      payment.status.toLowerCase().includes(query);

    const inDateRange =
      (!fromDate || new Date(payment.paymentDate) >= new Date(fromDate)) &&
      (!toDate || new Date(payment.paymentDate) <= new Date(toDate));

    return isMatch && inDateRange;
  });

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredPayments.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredPayments.map((p) => p.id));
    }
  };

  const handleDeleteSelected = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedRows.length} selected payment(s)?`
    );
    if (confirmDelete) {
      const updated = payments.filter((p) => !selectedRows.includes(p.id));
      setPayments(updated);
      setSelectedRows([]);
    }
  };

  // ✅ Export to Excel function
  const handleExportToExcel = () => {
    const exportData = filteredPayments.map((payment) => ({
      "Payment Date": moment(payment.paymentDate).format("MM/DD/YYYY hh:mm A"),
      "Payment ID": payment.id,
      "Quotation ID": payment.quotationId,
      "Grand Total": payment.grandTotal,
      "Advance Amount": payment.advanceAmount,
      "Payment Mode": payment.paymentMode,
      "Status": payment.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(file, "Payment_Report.xlsx");
  };

  return (
    <Container style={{ background: "#F4F4F4", paddingBlock: "20px" }}>
      {/* Header */}
      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex gap-2">
          <Form.Control
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            size="sm"
            style={{ fontSize: "12px" }}
          />
          <Form.Control
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            size="sm"
            style={{ fontSize: "12px" }}
          />
        </div>
        <div className="d-flex gap-2">
          {filteredPayments.length > 0 && (
            <Button
              variant="success"
              size="sm"
              onClick={handleExportToExcel}
              style={{ fontSize: "12px", padding: "6px 12px" }}
            >
              <FaFileExcel className="me-1" />
              Export to Excel
            </Button>
          )}
          {selectedRows.length > 0 && (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleDeleteSelected}
              style={{ fontSize: "12px", padding: "6px 12px" }}
            >
              <FaTrashAlt className="me-1" />
              Delete {selectedRows.length} Selected
            </Button>
          )}
        </div>
      </div>

      <Form.Control
        type="text"
        placeholder="Search by Quotation ID, Amount, Mode, Status"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="shadow-sm"
        style={{ width: "300px", fontSize: "12px", marginBottom: "10px" }}
      />

      {/* Payment Table */}
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
                  <Form.Check
                    type="checkbox"
                    checked={
                      selectedRows.length === filteredPayments.length &&
                      filteredPayments.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Payment Date</th>
                <th>Payment ID</th>
                <th>Quotation ID</th>
                <th>Grand Total</th>
                <th>Advance Amount</th>
                <th>Payment Mode</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="text-center">
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedRows.includes(payment.id)}
                      onChange={() => handleSelectRow(payment.id)}
                    />
                  </td>
                  <td style={{ fontSize: "12px" }}>
                    {moment(payment.paymentDate).format("MM/DD/YYYY hh:mm A")}
                  </td>
                  <td style={{ fontSize: "12px" }}>{payment.id}</td>
                  <td style={{ fontSize: "12px" }}>{payment.quotationId}</td>
                  <td style={{ fontSize: "12px" }}>{payment.grandTotal}</td>
                  <td style={{ fontSize: "12px" }}>{payment.advanceAmount}</td>
                  <td style={{ fontSize: "12px" }}>{payment.paymentMode}</td>
                  <td style={{ fontSize: "12px" }}>{payment.status}</td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    No payment records found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
          <Pagination totalItems={filteredPayments.length} />
      </Card>
    </Container>
  );
};

export default PaymentReport;
