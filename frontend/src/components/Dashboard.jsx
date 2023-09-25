import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import axios from 'axios';
import Header from "../components/Header";
import myImage from "../images/shufti.png";

const Dashboard = () => {
  const { carWashId } = useParams();
  const navigate = useNavigate();
  const [carWash, setCarWash] = useState(null);

  useEffect(() => {
    // Fetch car wash data using the `id` parameter
    fetchCarWashData(carWashId);
  }, [carWashId]);

  const fetchCarWashData = async (carWashId) => {
    try {
      const response = await fetch(
        `https://shufti-carwash-server.vercel.app/api/carwashes/${carWashId}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch car wash data (${response.status}: ${response.statusText})`
        );
      }
      const data = await response.json();
      setCarWash(data);
    } catch (error) {
      console.error("Error fetching car wash data:", error);
    }
  };

  return (
    <>
      <Header />
      <section className="heading">
        <div className="main_image ">
          <img src={myImage} alt="carwash" style={{ width: "100%" }} />
        </div>
        <div
          style={{ marginTop: "30px", alignItems: "center" }}
          className="carwashname"
        >
          <p style={{ fontSize: "27px", fontWeight: "bold", color: "black" }}>
            Welcome to
          </p>
          <p style={{ fontSize: "30px", fontWeight: "bold" }}>
            {carWash?.name}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "30px",
            justifyContent: "center",
          }}
          className="btns"
        >
          <button
            style={{ marginRight: "20px" }}
            className="btn "
            onClick={() => navigate(`/login/${carWashId}`)}
          >
            Customer Login
          </button>
          <button
            className="btn "
            onClick={() => navigate(`/staff/login/${carWashId}`)}
          >
            Carwash Login
          </button>
        </div>
      </section>
    </>
  );
};
export default Dashboard;
