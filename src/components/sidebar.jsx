import { Link, useLocation } from "react-router-dom";
import { FaUsers,FaRegWindowRestore,  FaFileInvoice, FaShoppingCart, FaIndustry, FaMoneyBillWave, FaLayerGroup , FaUserCog } from "react-icons/fa";
import { useState, useEffect } from "react";
import logo from "../assets/RentangadiLogo1.png";
import { MdOutlineInventory, MdPostAdd  } from "react-icons/md";

const Sidebar = () => {
  const location = useLocation();
  // const [activeLink, setActiveLink] = useState(location.pathname);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: FaLayerGroup },
    { name: "Master", path: "/master", icon: FaRegWindowRestore  },
    // { name: "Banner", path: "/customer", icon: FaUsers },
    { name: "Banner", path: "/banner", icon: FaUsers },
    // { name: "Product", path: "/quotation", icon: FaFileInvoice },
    { name: "Product Managemnet", path: "/prdoduct-management", icon: FaFileInvoice },
    // { name: "Clients", path: "/booking", icon: FaShoppingCart },
    { name: "Clients", path: "/client", icon: FaShoppingCart },
    // { name: "Orders", path: "/vendors", icon: FaIndustry },
    { name: "Orders", path: "/orders", icon: FaIndustry },
    { name: "Enquiry List", path: "/enquiry-list", icon: FaIndustry },
    { name: "Enquiry Calender", path: "/enquiry-calender", icon: FaIndustry },
    // { name: "Enquiry", path: "/inventory", icon: MdOutlineInventory },
    { name: "Quotation", path: "/quotation", icon: FaMoneyBillWave },
    { name: "Terms & Conditions", path: "/terms-conditions", icon: FaIndustry },
    // { name: "Quotations", path: "/payment", icon: FaMoneyBillWave },
    // { name: "Post Production", path: "/post-production", icon: MdPostAdd  },
    { name: "Payment Report", path: "/payment-report", icon: FaUserCog  },
    { name: "Refurbihsment Report", path: "/refurbihsment-report", icon: FaUserCog  },
    { name: "Inventory Product List", path: "/inventory-product-list", icon: FaUserCog  },

  ];

  // Update activeLink when location.pathname changes (e.g., after a page reload)
  // useEffect(() => {
  //   setActiveLink(location.pathname);
  // }, [location.pathname]);

  // Function to check if the path is active (includes for partial matching)
  const isActiveLink = (path) => {
    return location.pathname.includes(path);
  };

  return (
 <div
  className="flex-column flex-shrink-0 p-3 vh-100 position-fixed sidebar-scroll"
  style={{
    width: "280px",
    zIndex:1,
    background: "#323D4F",
    overflowY: "auto",      
    overflowX: "hidden",     
  }}
>
      <div className="w-100 d-flex justify-content-center">
        <Link to="/dashboard">
          <img src={logo} alt="logo" style={{ width: "120px" }} className="mx-auto" />
        </Link>
      </div>

      <ul className="nav flex-column mt-2">
        {menuItems.map((item, index) => (
          <li key={index} className="nav-item my-1">
            <Link
              to={item.path}
              className={`${
                isActiveLink(item.path) ? "bg-dark text-dark" : ""
              } nav-link d-flex align-items-center text-white`}
            >
              <item.icon className="me-2" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
