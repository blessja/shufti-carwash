// import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Header({ carWashName }) {
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const mobileMenuRef = useRef(null);
  const { carWashId } = useParams();
  const [carWash, setCarWash] = useState({ name: "", imageId: "" });
  const [carWashImage, setCarWashImage] = useState(""); // Initialize with an empty string

  // const toggleMobileMenu = () => {
  //   setIsMobileMenuOpen(!isMobileMenuOpen);
  // };

  useEffect(() => {
    if (carWashId) {
      fetchCarWashData(carWashId);
      fetchCarWashImage(carWashId);
    }
  }, [carWashId]);

  const fetchCarWashData = (carWashId) => {
    fetch(`https://shufti-carwash-server.vercel.app/api/carwashes/${carWashId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch car wash data (${response.status}: ${response.statusText})`
          );
        }
        return response.json();
      })
      .then((data) => {
        setCarWash(data);
      })
      .catch((error) => {
        console.error("Error fetching car wash data:", error.message);
      });
  };

  const fetchCarWashImage = (carWashId) => {
    const imageUrl = `/carwash-images/${carWashId}.jpeg`;
    setCarWashImage(imageUrl); // Set the carWashImage state
  };

  return (
    <header
      style={{
        background: "white",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0px",
      }}
      className="header"
    >
      <img
        style={{ width: "100px", height: "100px" }}
        src={carWashImage}
        alt={`${carWashName} Car Wash`}
      />
      <h1 className="carwash-h">{carWash.name}</h1>

      <IconContext.Provider value={{ color: "#4682B4" }}>
        <div className="mobile-menu"></div>
      </IconContext.Provider>
    </header>
  );
}

export default Header;
