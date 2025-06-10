import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";
import "./App.css";
import "react-calendar/dist/Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Dashboard from "./pages/Dashboard";
import Master from "./pages/Master";
// import QuotationPage from "./pages/Quatation/QuotationPage";
// import VendorManagement from "./pages/Vendors/VendorManagement";
// import Customer from "./pages/Customer";
// import AddleadsForm from "./pages/Customer/AddleadsForm";
// import LeadsDetails from "./pages/Customer/LeadsDetails";
// import PaymentPage from "./pages/Payment/PaymentPage";
// import PostProductionPage from "./pages/PostProduction/PostProductionPage";

// import CreateQuote from "./pages/Customer/CreateQuote.jsx";
// import FinalQuotationPage from "./pages/Customer/FinalQuotationPage.jsx";
// import Booking from "./pages/Booking.jsx";
// import BookingdetailsPage from "./pages/Booking/BookingdetailsPage.jsx";
// import VendorAssign from "./pages/Vendors/VendorAssign.jsx";
// import Finishevents from "./pages/Booking/Finishevents.jsx";
// import CalenderEvents from "./pages/Booking/CalenderEvents.jsx";
// import Inventory from "./pages/Inventory/Inventory.jsx";
// import InventoryList from "./pages/Inventory/InventoryList.jsx";
// import AddInventory from "./pages/Inventory/AddInventory.jsx";
// import Maintenance from "./pages/Inventory/Maintenance.jsx";
// import EquipmentDetails from "./pages/Inventory/EquipmentDetails.jsx";
// import AddMaintenance from "./pages/Inventory/AddMaintenance.jsx";
// import AssigndInventory from "./pages/Inventory/AssigndInventory.jsx";
// import EditleadsDetails from "./pages/Customer/EditleadsDetails.jsx";

// import VendorDetails from "./pages/Vendors/VendorDetails.jsx";
// import UserManagement from "./pages/Settings/UserManagement.jsx";
// import AvailableVendors from "./pages/Vendors/AvailableVendors.jsx";
// import AssignedVendor from "./pages/Vendors/AssignedVendor.jsx";
// import InstallmentDetails from "./pages/Payment/InstallmentDetails.jsx";
// import Settings from "./pages/Settings.jsx";
// import Profile from "./pages/Profile.jsx";
// import PostProductionDetail from "./pages/Postproduction/PostProductionDetail.jsx";
// import BookingCalender from "./pages/BookingCalender.jsx";
// import TaskDetail from "./pages/Postproduction/TaskDetail.jsx";
// import Invoice from "./pages/Payment/Invoice.jsx";
import Login from "./pages/Login.jsx";
import Banner from "./pages/Banner/Banner.jsx";
import ProductManagement from "./pages/Product/ProductManagement.jsx";
import AddProduct from "./pages/Product/AddProduct.jsx";
import Client from "./pages/Client/Client.jsx";
import AddClient from "./pages/Client/AddClient.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import OrderDetails from "./pages/Orders/OrderDetails.jsx";
import EnquiryList from "./pages/Enquiry/EnquiryList.jsx";
import AddNewEnquiry from "./pages/Enquiry/AddNewEnquiry.jsx";
import OrderListBydate from "./pages/Orders/OrderListBydate.jsx";
import EnquiryDetails from "./pages/Enquiry/EnquiryDetails.jsx";
import EnquiryCalender from "./pages/Enquiry/EnquiryCalender.jsx";
import EnquiryByDate from "./pages/Enquiry/EnquiryByDate.jsx";
import TermsAndConditions from "./pages/Terms&Conditions/TermsAndConditions.jsx";
import Quotation from "./pages/Quatation/Quotation.jsx";
import PaymentReport from "./pages/Payment/PaymentReport.jsx";
import RefurbishmentReport from "./pages/Refurbishment/RefurbishmentReport.jsx";
import RefurbishmentInvoice from "./pages/Refurbishment/RefurbishmentInvoice.jsx";
import InventoryProduct from "./pages/InventoryProduct/InventoryProductList.jsx";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", true);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <>
          <Toaster position="top-right" />
          <Layout>
            <Routes>
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/master" element={<Master />} />
              <Route path="/banner" element={<Banner />} />
              <Route
                path="/prdoduct-management"
                element={<ProductManagement />}
              />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/client" element={<Client />} />
              <Route path="/add-client" element={<AddClient />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders-details/:id" element={<OrderDetails />} />
              <Route path="/enquiry-list" element={<EnquiryList />} />
              <Route path="/enquiry-calender" element={<EnquiryCalender />} />
              <Route path="/add-new-enquiry" element={<AddNewEnquiry />} />
              <Route path="/enquiry-details/" element={<EnquiryDetails />} />
              <Route
                path="/enquiry-by-date/:date"
                element={<EnquiryByDate />}
              />
              <Route
                path="/orders-by-date/:date"
                element={<OrderListBydate />}
              />
              <Route
                path="/terms-conditions"
                element={<TermsAndConditions />}
              />
              <Route path="/quotation" element={<Quotation />} />
              <Route path="/payment-report" element={<PaymentReport />} />
              <Route
                path="/refurbihsment-report"
                element={<RefurbishmentReport />}
              />
              <Route
                path="/refurbishment-invoice"
                element={<RefurbishmentInvoice />}
              />
              <Route
                path="/inventory-product-list"
                element={<InventoryProduct />}
              />

              {/* <Route path="/customer" element={<Customer />} />
                <Route path="/quotation" element={<QuotationPage />} />
                <Route path="/booking-list" element={<Booking />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/vendors" element={<VendorManagement />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/post-production" element={<PostProductionPage />}/> */}
              {/* 
                <Route
                  path="/booking/booking-details/:id"
                  element={<BookingdetailsPage />}
                />
                <Route
                  path="/booking/finished-events"
                  element={<Finishevents />}
                />
                <Route
                  path="/booking/calender-events"
                  element={<CalenderEvents />}
                />
                <Route path="/customer/addLeads" element={<AddleadsForm />} />
                <Route
                  path="/customer/leadsDetails/:id"
                  element={<LeadsDetails />}
                />
                <Route
                  path="/customer/editleads-details/:id"
                  element={<EditleadsDetails />}
                />
                <Route
                  path="/customer/create-quote/:id"
                  element={<CreateQuote />}
                />
                <Route
                  path="/customer/quote/:id"
                  element={<FinalQuotationPage />}
                />

                <Route
                  path="/vendors/vendor-assign/:id"
                  element={<VendorAssign />}
                />

                <Route
                  path="/inventory/inventory-list"
                  element={<InventoryList />}
                />
                <Route
                  path="/inventory/add-inventory"
                  element={<AddInventory />}
                />
                <Route
                  path="/inventory/maintenance"
                  element={<Maintenance />}
                />
                <Route
                  path="/inventory/add-maintenance"
                  element={<AddMaintenance />}
                />
                <Route
                  path="/inventory/equipment-details"
                  element={<EquipmentDetails />}
                />
                <Route
                  path="/inventory/assigned-inventory"
                  element={<AssigndInventory />}
                /> */}

              {/* <Route
                  path="/vendors/vendor-details/:id"
                  element={<VendorDetails />}
                />
                <Route path="/settings/add-User" element={<UserManagement />} />
                <Route
                  path="/vendors/available-vendors"
                  element={<AvailableVendors />}
                />
                <Route
                  path="/vendors/assigned-vendor"
                  element={<AssignedVendor />}
                />
                <Route
                  path="/payment/installment-details/:id"
                  element={<InstallmentDetails />}
                />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/post-production/post-production-detail/:id"
                  element={<PostProductionDetail />}
                />
                <Route path="/booking" element={<BookingCalender />} />
                <Route
                  path="/post-production/task-detail/:eventId"
                  element={<TaskDetail />}
                />
                <Route path="/invoice" element={<Invoice />} /> */}
            </Routes>
          </Layout>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login handleLogin={handleLogin} />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
