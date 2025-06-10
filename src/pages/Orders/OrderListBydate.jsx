import React from "react";
import { Table, Button, Card, Container } from "react-bootstrap";
import { MdVisibility } from "react-icons/md";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";


const dummyOrders = [
  {
    id: 1,
    companyName: "NNC Pvt Ltd",
    contactNumber: "9876543210",
    executiveName: "Ravi Kumar",
    address: "Channasandra Bus Stand, Bangalore",
    orderStatus: "Completed",
    grandTotal: 2000,
    productsList: ["Chair", "Table"],
    bookingDate: "2025-06-06T16:07:58",
    startDate: "2025-06-07",
    email: "contact@nnc.com"
  },
  {
    id: 2,
    companyName: "VT Enterprises",
    contactNumber: "9123456780",
    executiveName: "Vikram T",
    address: "8/2, 2ND CROSS, MANJUNATHA NAGAR, Bengaluru, Karnataka, 560016",
    orderStatus: "Pending",
    grandTotal: 11683.36,
    productsList: ["Sofa", "Lamp"],
    bookingDate: "2025-06-06T11:01:48",
    startDate: "2025-06-07",
    email: "info@vtenterprises.com"
  },
  {
    id: 3,
    companyName: "Sharath Art Director",
    contactNumber: "9988776655",
    executiveName: "Sharath",
    address: "Peacock Studio, Bangalore",
    orderStatus: "In Progress",
    grandTotal: 147500,
    productsList: ["Backdrop", "Props"],
    bookingDate: "2025-06-04T10:50:18",
    startDate: "2025-06-07",
    email: "sharath@art.com"
  },
  {
    id: 4,
    companyName: "Creative Events",
    contactNumber: "9001122334",
    executiveName: "Priya Singh",
    address: "MG Road, Bangalore",
    orderStatus: "Completed",
    grandTotal: 8500,
    productsList: ["Stage", "Lights"],
    bookingDate: "2025-06-03T09:30:00",
    startDate: "2025-06-08",
    email: "priya@creativeevents.com"
  },
  {
    id: 5,
    companyName: "Urban Decor",
    contactNumber: "9011223344",
    executiveName: "Amit Jain",
    address: "Indiranagar, Bangalore",
    orderStatus: "Cancelled",
    grandTotal: 4500,
    productsList: ["Curtains", "Cushions"],
    bookingDate: "2025-06-02T14:15:00",
    startDate: "2025-06-09",
    email: "amit@urbandecor.com"
  },
  {
    id: 6,
    companyName: "Elegant Weddings",
    contactNumber: "9022334455",
    executiveName: "Neha Kapoor",
    address: "Jayanagar, Bangalore",
    orderStatus: "Completed",
    grandTotal: 25000,
    productsList: ["Mandap", "Flowers"],
    bookingDate: "2025-06-01T12:00:00",
    startDate: "2025-06-10",
    email: "neha@elegantweddings.com"
  },
  {
    id: 7,
    companyName: "StudioX",
    contactNumber: "9033445566",
    executiveName: "Rahul Mehra",
    address: "Koramangala, Bangalore",
    orderStatus: "Pending",
    grandTotal: 12000,
    productsList: ["Camera", "Tripod"],
    bookingDate: "2025-05-31T17:45:00",
    startDate: "2025-06-11",
    email: "rahul@studiox.com"
  },
  {
    id: 8,
    companyName: "Eventify",
    contactNumber: "9044556677",
    executiveName: "Sonia Rao",
    address: "HSR Layout, Bangalore",
    orderStatus: "Completed",
    grandTotal: 9800,
    productsList: ["Banner", "Stands"],
    bookingDate: "2025-05-30T10:20:00",
    startDate: "2025-06-12",
    email: "sonia@eventify.com"
  },
  {
    id: 9,
    companyName: "The Decor House",
    contactNumber: "9055667788",
    executiveName: "Karan Patel",
    address: "Whitefield, Bangalore",
    orderStatus: "In Progress",
    grandTotal: 6700,
    productsList: ["Vases", "Tablecloth"],
    bookingDate: "2025-05-29T15:10:00",
    startDate: "2025-06-13",
    email: "karan@dechorhouse.com"
  },
  {
    id: 10,
    companyName: "Party Planners",
    contactNumber: "9066778899",
    executiveName: "Deepa Nair",
    address: "BTM Layout, Bangalore",
    orderStatus: "Completed",
    grandTotal: 5400,
    productsList: ["Balloons", "Confetti"],
    bookingDate: "2025-05-28T11:05:00",
    startDate: "2025-06-14",
    email: "deepa@partyplanners.com"
  }
];

const OrderListBydate = () => {
  const navigate = useNavigate();
  const { date } = useParams();

  // Filter orders for the selected date (compare only date part)
  const orders = dummyOrders.filter(
    (order) => moment(order.bookingDate).format("YYYY-MM-DD") === date
  );

  return (
    <Container className="my-4">
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-3">
            Orders for {date && moment(date).format("MMMM DD, YYYY")}
          </h5>
          <div className="table-responsive">
            <Table
              striped
              hover
              bordered
              className="mb-0"
              style={{ fontSize: "0.85rem" }}
            >
              <thead style={{ backgroundColor: "#f8f9fa" }}>
                <tr>
                  <th style={{ width: "15%" }}>Book Date/Time</th>
                  <th style={{ width: "15%" }}>Company Name</th>
                  <th style={{ width: "15%" }}>Executive Name</th>
                  <th style={{ width: "10%" }}>Grand Total</th>
                  <th style={{ width: "10%" }}>Start Date</th>
                  <th style={{ width: "25%" }}>Address</th>
                  <th style={{ width: "5%" }} className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id} style={{ verticalAlign: "middle" }}>
                      <td>
                        {moment(order.bookingDate).format("MM/DD/YYYY hh:mm A")}
                      </td>
                      <td>{order.companyName}</td>
                      <td>{order.executiveName}</td>
                      <td>{order.grandTotal}</td>
                      <td>{order.startDate}</td>
                      <td>{order.address}</td>
                      <td className="text-center">
                        <Button
                          variant="outline-dark"
                          size="sm"
                          onClick={() => navigate(`/orders-details/${order.id}`)}
                        >
                          <MdVisibility />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No orders found.
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

export default OrderListBydate;