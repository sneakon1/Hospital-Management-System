import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import axios from "axios";

const Stats = () => {

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
      console.log(data.doctors);
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, []);

  const data = [
    { name: "Pending", value: appointments.filter(a => a.status == 'Pending').length },
    { name: "Accepted", value: appointments.filter(a => a.status == 'Accepted').length },
    { name: "Rejected", value: appointments.filter(a => a.status == 'Rejected').length },
  ];

  const COLORS = ["#FFBB28", "#00C49F", "#FF4D4F"];

  const totalData = [
    { name: "Total Appointments", count: appointments.length },
    { name: "Total Doctors", count: doctors.length },
  ];

  return (
    <section className="dashboard page" style={{ padding: "2rem" }}>
      <div className="">
        <h2>Dashboard Statistics</h2>

        {/* Summary Stats */}
        <div className="stats-grid" style={{ display: "flex", gap: "1rem", margin: "20px 0" }}>
          {totalData.map((item, idx) => (
            <div
              className="stat-card"
              key={idx}
              style={{
                backgroundColor: "#f5f5f5",
                padding: "1rem",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <h3>{item.name}</h3>
              <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{item.count}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Charts Side by Side */}
      <div
        className="chart-row"
        style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "space-between" }}
      >
        {/* Bar Chart */}
        <div className="chart-box" style={{ flex: 1, minWidth: "300px" }}>
          <h3>Appointments Bar Chart</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} style={{ overflow: "hidden" }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="chart-box" style={{ flex: 1, minWidth: "300px" }}>
          <h3>Appointments Pie Chart</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart style={{ overflow: "hidden" }}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default Stats;
