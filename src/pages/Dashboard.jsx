import React from "react";
import { Card } from "react-bootstrap";
import {
  AiOutlineUser,
  AiOutlinePhone,
  AiOutlineDollarCircle,
  AiOutlineCalendar,
  AiOutlineTool,
} from "react-icons/ai";
import {
  FaUsers,
  FaWarehouse,
  FaTruckLoading,
  FaIndustry,
  FaUserCog,
  FaCheckCircle,
  FaPencilAlt,
  FaMoneyCheckAlt,
  FaBoxOpen,
  FaBox,
} from "react-icons/fa";

// Importing chart.js and react-chartjs-2 for the bar chart
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering the necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const preProductionData = [
    {
      title: "Orders",
      count: 45,
      icon: <FaBoxOpen size={40} />,
    },
    {
      title: "Clients",
      count: 10,
      icon: <FaUsers size={40} />,
    },
    {
      title: "Quotations",
      count: 25,
      icon: <FaWarehouse size={40} />,
    },
  ];

  // Sample data for the bar chart (Orders in different months)
  const orderData = {
    labels: ["January", "February", "March", "April", "May", "June"], // Months
    datasets: [
      {
        label: "Orders",
        data: [10, 20, 15, 30, 25, 40],
        backgroundColor: "#4e73df",
        borderColor: "#2e59d9",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Orders per Month",
      },
      tooltip: {
        callbacks: {
          // Customize tooltip to show the count of orders in the tooltip
          label: (context) => `Orders: ${context.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  return (
    <div className="container p-4 rounded " style={{ background: "#F4F4F4" }}>
      <div className="row mt-4 justify-content-start">
        {preProductionData.map((item, index) => (
          <div className="col-4 mb-2 px-1" key={index}>
            <Card className="shadow border-0 p-2 text-center card-hover">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <div className="mb-1 icon">{item.icon}</div>
                <h6 className="fw-bold mb-1" style={{ fontSize: "12px" }}>
                  {item.title}
                </h6>
                <p className="fw-bold mb-0" style={{ fontSize: "18px" }}>
                  {item.count}
                </p>
                <small className="text-muted" style={{ fontSize: "10px" }}>
                  {item.subtitle}
                </small>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Bar Chart for Orders */}
      <div className="mt-4">
        <Card className="shadow border-0 p-2">
          <Card.Body>
            <h6 className="fw-bold mb-3" style={{ fontSize: "16px" }}>
              Orders Per Month
            </h6>
            <Bar data={orderData} options={options} />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
