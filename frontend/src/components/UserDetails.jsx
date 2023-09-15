import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";





const theme = createTheme({
  palette: {
    primary: {
      main: "#789cbb", // Replace with your desired custom color
    },
  },
});




const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  console.log(isButtonDisabled)
  const handleHomeClick = () => {
    window.history.back(); // Go back to the previous page
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/${id}`
        );
        const data = await response.json();
        setUser(data);
        setIsButtonDisabled(localStorage.getItem(id) === "true");
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleWashCar = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${id}/wash`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      setUser(data);
      console.log("Wash history updated");
      setIsButtonDisabled(true);
      localStorage.setItem(id, "true");
      setShowNotification(true);
    } catch (error) {
      console.error("Error washing car:", error);
    }
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  // useEffect(() => {
  //   const handlePageReload = () => {
  //     setIsButtonDisabled(localStorage.getItem(id) === "true");
  //   };

  //   window.addEventListener("beforeunload", handlePageReload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handlePageReload);
  //   };
  // }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}
      >
        <h3 style={{ marginBottom: "20px", color: "#4682B4", fontFamily: "Montserrat", paddingTop:"40px", fontWeight: "600", fontSize: "19px" }}>
          RECORD A WASH
        </h3>
        <div
          style={{
            background: "#4682B4",
            opacity: "1",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "left"
          }}
        >
        <div>
        <p
            style={{
              marginBottom: "10px",
              opacity: "1",
              color: "#045293",
              fontFamily: "Montserrat",
              fontWeight: "bolder"
            }}
          >
          {user.name}
          </p>
          <p style={{ marginBottom: "10px", color: "#fff", fontFamily: "Montserrat",
              fontWeight: "lighter" }}>{user.phone}</p>
          <p style={{ marginBottom: "10px",  color: "#fff",  fontFamily: "Montserrat",
              fontWeight: "lighter" }}>
             {user.number_plate}
          </p>
          <p style={{ marginBottom: "10px", color: "#fff",fontFamily: "Montserrat",
              fontWeight: "lighter"  }}> {user.car}</p>
        </div>
        
        </div>
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "30px",}}>
        <Button
            variant="contained"
            
            onClick={handleWashCar}
            // disabled={isButtonDisabled}
            style={{ marginTop: "10px", backgroundColor: "#4682B4",color: "#fff",   }}
            component="button"
            
          >Wash Car
            {/* {isButtonDisabled ? "Car Washed" : "Wash Car"} */}
          </Button>
        </div>
        <Button
          style={{ marginTop: "60px", backgroundColor: "#4682B4", color: "#fff", }}
          variant="contained"
         
          onClick={handleHomeClick}

          component="button"
        >
          HOME
        </Button>
      </div>
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={handleNotificationClose}
        message="Wash successfully recorded"
      />
    </ThemeProvider>
  );
};

export default UserDetails;
