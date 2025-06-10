import React, { useState, useMemo } from "react";
import { Card, Container } from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";

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

const localizer = momentLocalizer(moment);

const EnquiryCalender = () => {
  const navigate = useNavigate();
  const [enquiries] = useState(dummyEnquiries);

  // Group enquiries by date
  const enquiriesCountByDate = useMemo(() => {
    const map = {};
    enquiries.forEach((enq) => {
      // Use enq.enquiryDate as key (format: DD-MM-YYYY)
      // Convert to YYYY-MM-DD for Date parsing
      const [dd, mm, yyyy] = enq.enquiryDate.split("-");
      const dateKey = `${yyyy}-${mm}-${dd}`;
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(enq);
    });
    return map;
  }, [enquiries]);

  // Create calendar events (one per date)
  const calendarEvents = Object.entries(enquiriesCountByDate).map(
    ([date, enqs]) => ({
      title: `Enquiries: ${enqs.length}`,
      start: new Date(date),
      end: new Date(date),
      allDay: true,
      enquiries: enqs,
      date,
    })
  );

  // On event click, go to /enquiry-by-date/:date (date in DD-MM-YYYY)
  const handleCalendarEventClick = (event) => {
    // Convert YYYY-MM-DD to DD-MM-YYYY
    const [yyyy, mm, dd] = event.date.split("-");
    const ddmmyyyy = `${dd}-${mm}-${yyyy}`;
    navigate(`/enquiry-by-date/${ddmmyyyy}`);
  };

  return (
    <Container className="my-4">
      <Card className="shadow-sm">
        <Card.Body>
          {/* <h5 style={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Enquiry Calendar
          </h5> */}
          <div style={{ minHeight: 500 }}>
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              views={["month", "week", "day", "agenda"]}
              popup
              selectable
              onSelectEvent={handleCalendarEventClick}
            />
          </div>
          <div style={{ fontSize: 13, marginTop: 16, color: "#888" }}>
            <b>Note:</b> Click on a calendar event to view all enquiries for that day.
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EnquiryCalender;