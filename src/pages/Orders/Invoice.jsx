import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import logo from "../../assets/RentangadiLogo.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ApiURL } from "../../api";

const Invoice = () => {
   const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const res = await axios.get(`${ApiURL}/order/getOrder/${id}`);
      if (res.status === 200) {
        setOrder(res.data.order);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const getAllProducts = () => {
    return order?.slots?.flatMap(slot => slot.products || []) || [];
  };

  if (!order) return <div>Loading invoice...</div>;

  const items = getAllProducts();
  const discount = Number(order?.discount || 0);
  const transport = Number(order?.transportcharge || 0);
  const manpower = Number(order?.labourecharge || 0);
  const gst = Number(order?.GST || 0);

  const subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0);
  const afterCharges = subtotal + transport + manpower;
  const discountAmt = afterCharges * (discount / 100);
  const afterDiscount = afterCharges - discountAmt;
  const gstAmt = afterDiscount * (gst / 100);
  const grandTotal = Math.round(afterDiscount + gstAmt);

  const invoice = {
    invoiceNo: order.quoteId || "-",
    invoiceDate: order.slots?.[0]?.quoteDate || "-",
    reverseCharge: "N",
    state: "Karnataka",
    code: "29",
    billTo: {
      name: order.clientName || "-",
      address: order.Address || "-",
      gstin: "29ABUFS6629Q1ZS",
      state: "Karnataka",
      code: "29",
    },
    items,
    labourecharge: manpower,
    transportcharge: transport,
    discount,
    gst,
    amountWords: "-",
    bankDetails: {
      account: "50200099507304",
      ifsc: "HDFC0004051",
      name: "HDFC, CMH Road",
    },
  };
  return (
    <Container className="p-4 border">
      <Row className="mb-4">
        <Col md={3}>
          <img src={logo} alt="Rent Angadi Logo" style={{ width: "100%" }} />
        </Col>
        <Col
          md={9}
          className="text-center"
          style={{ backgroundColor: "#0c4472", color: "#fff", padding: "10px" }}
        >
          <h4>Rent Angadi</h4>
          <p>Sy No 258/8, Old Sy No 258/1 Battahalasur Jala Hobli</p>
          <p>Bettahalasur, Bangalore, Karnataka - 560001</p>
          <p>Tel: +91 9619886262</p>
          <p>GSTIN: 29ABJFR2437E1Z3</p>
        </Col>
      </Row>

      <h5 className="text-center text-white py-2" style={{ backgroundColor: "#0c4472" }}>
        Tax Invoice
      </h5>

      <Table bordered size="sm">
        <tbody>
          <tr><td><b>Invoice No:</b> {invoice.invoiceNo}</td></tr>
          <tr><td><b>Invoice Date:</b> {invoice.invoiceDate}</td></tr>
          <tr><td><b>Reverse Charge (Y/N):</b> {invoice.reverseCharge}</td></tr>
          <tr>
            <td><b>State:</b> {invoice.state}</td>
            <td><b>Code:</b> {invoice.code}</td>
          </tr>
        </tbody>
      </Table>

      <Table bordered className="mb-4" style={{ tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th colSpan={2} style={{ backgroundColor: "#1f497d", color: "white", textAlign: "center" }}>Bill to Party</th>
            <th colSpan={2} style={{ backgroundColor: "#1f497d", color: "white", textAlign: "center" }}>Ship to Party</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: "15%" }}>Name :</td>
            <td style={{ width: "35%" }}>{invoice.billTo.name}</td>
            <td style={{ width: "15%" }}>Name:</td>
            <td style={{ width: "35%" }}>-</td>
          </tr>
          <tr>
            <td>Address :</td>
            <td>{invoice.billTo.address}</td>
            <td>Address:</td>
            <td>-</td>
          </tr>
          <tr>
            <td>GSTIN :</td>
            <td>{invoice.billTo.gstin}</td>
            <td>GSTIN:</td>
            <td>-</td>
          </tr>
          <tr>
            <td>State :</td>
            <td>{invoice.billTo.state} <strong className="ms-3">Code : {invoice.billTo.code}</strong></td>
            <td>State:</td>
            <td>Code:</td>
          </tr>
        </tbody>
      </Table>

      <Table bordered className="mt-4" size="sm">
        <thead className="bg-secondary text-white text-center">
          <tr>
            <th>S. No.</th>
            <th>Date</th>
            <th>Slot</th>
            <th>Product Description</th>
            <th>HSN</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Days</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, idx) => (
            <tr key={idx}>
              <td className="text-center">{idx + 1}</td>
              <td className="text-center">
                {item.productQuoteDate && item.productEndDate ? (
                  <>
                    {item.productQuoteDate}<br />to<br />{item.productEndDate}
                  </>
                ) : (
                  "-"
                )}
              </td>
              <td className="text-center">{item.productSlot || "-"}</td>
              <td>{item.productName || "-"}</td>
              <td className="text-center">998596</td>
              <td className="text-center">{item.quantity || "-"}</td>
              <td className="text-center">{item.rate || "-"}</td>
              <td className="text-center">{item.days || "-"}</td>
              <td>{(item.total || 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

       <Table bordered size="sm" className="mt-3">
        <tbody>
          <tr><td><b>Total Product Amount</b></td><td>₹ {subtotal.toFixed(2)}</td></tr>
          <tr><td><b>Labour Charges</b></td><td>₹ {manpower.toFixed(2)}</td></tr>
          <tr><td><b>Transport Charges</b></td><td>₹ {transport.toFixed(2)}</td></tr>
          <tr><td><b>Discount ({discount}%)</b></td><td>₹ {discountAmt.toFixed(2)}</td></tr>
          <tr><td><b>GST @ {gst}%</b></td><td>₹ {gstAmt.toFixed(2)}</td></tr>
          <tr className="bg-primary text-white"><td><b>Grand Total</b></td><td><b>₹ {grandTotal.toFixed(2)}</b></td></tr>
        </tbody>
      </Table>


      <p className="text-center fst-italic">{invoice.amountWords}</p>

      <h6>Bank Details</h6>
      <p><b>Bank A/C:</b> {invoice.bankDetails.account}</p>
      <p><b>IFSC:</b> {invoice.bankDetails.ifsc}</p>
      <p><b>Bank Name:</b> {invoice.bankDetails.name}</p>

      <div className="mt-5 d-flex justify-content-between">
        <p>GST on Reverse Charge: -</p>
        <div className="text-end">
          <p>For Rent Angadi</p>
          <p className="mt-5"><b>Authorised Signatory</b></p>
        </div>
      </div>

      <p className="text-center mt-3 small">All cheques to be drawn in the name of Rent Angadi</p>
    </Container>
  );
};

export default Invoice;