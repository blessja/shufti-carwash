import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Header from "../components/Header";

function UserDashboard() {
  const [washHistory, setWashHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId, carWashId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch wash history data when the component mounts
    fetchWashHistory(userId);
  }, [userId]);

  const fetchWashHistory = (userId) => {
    setIsLoading(true);

    fetch(
      `https://shufti-carwash-server.vercel.app/api/users/${userId}/wash-history`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch wash history (${response.status}: ${response.statusText})`
          );
        }
        return response.json();
      })
      .then((data) => {
        setWashHistory(data);
      })
      .catch((error) => {
        console.error("Error fetching wash history:", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    // Redirect the user to the desired route on logout
    localStorage.removeItem("userId"); // Replace with your actual user identifier
    navigate(`/${carWashId}/dashboard`);
  };

  const washCount = washHistory.length;
  const isTenthWashFree = washCount >= 9;

  useEffect(() => {
    // Check if the user has reached the 10 washes
    if (isTenthWashFree) {
      // Schedule the archive and clear process after 24 hours
      const archiveTimer = setTimeout(() => {
        archiveWashHistory();
      }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

      // Clear the timer on unmount or when the history is archived manually
      return () => clearTimeout(archiveTimer);
    }
  }, [isTenthWashFree]);

  const archiveWashHistory = () => {
    // Send a request to the server to archive wash history
    fetch(`http://localhost:3000/api/users/archive-wash-history/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ washHistory }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to archive wash history (${response.status}: ${response.statusText})`
          );
        }
        return response.json();
      })
      .then(() => {
        // Clear the wash history after archiving
        setWashHistory([]);
      })
      .catch((error) => {
        console.error("Error archiving wash history:", error.message);
      });
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container maxWidth="sm">
      <Header />

      <Typography
        variant="h5"
        gutterBottom
        style={{ color: "#4682B4", marginTop: "30px", marginBottom: "10px" }}
      >
        UPCOMING DISCOUNTS
      </Typography>

      <Typography
        gutterBottom
        style={{ color: "#4682B4", marginTop: "30px", marginBottom: "60px" }}
      >
        THE 10th WASH IS FREE
      </Typography>

      {isLoading ? (
        <p>Loading wash history...</p>
      ) : (
        <div>
          <List>
            {washHistory.length > 0 ? (
              washHistory.map((wash, index) => (
                <ListItem key={index} style={{ color: "#12F329" }}>
                  <Grid container alignItems="center" spacing={0}>
                    <Grid item xs={6}>
                      <ListItemText primary={formatDate(wash.date)} />
                    </Grid>
                    <Grid item xs={2}>
                      <div
                        style={{
                          position: "relative",
                          display: "inline-block",
                          backgroundColor: "#12F329",
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            backgroundColor: "#12F329",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: "bold",
                              backgroundColor: "#12F329",
                              color: "white",
                            }}
                          >
                            {index + 1}
                          </span>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItemText
                        primary={
                          isTenthWashFree && index === 9 ? "FREE" : "WASHED"
                        }
                        align="center"
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              ))
            ) : (
              <Typography variant="body1">
                No wash history available.
              </Typography>
            )}
          </List>
        </div>
      )}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <button className="btn btn-block" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </Container>
  );
}

export default UserDashboard;
