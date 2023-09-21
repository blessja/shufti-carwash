import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';


function UserDashboard() {
  const [washHistory, setWashHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { userId } = useParams();
console.log('User ID:', userId);

  


  useEffect(() => {
    console.log('Fetching wash history for userId:', userId);
  
    // Fetch wash history data when the component mounts
    fetchWashHistory(userId);
  }, [userId]);
  
  const fetchWashHistory = (userId) => {
    setIsLoading(true);
  
    fetch(`https://shufti-carwash-server.vercel.app/api/users/${userId}/wash-history`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch wash history (${response.status}: ${response.statusText})`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Wash history data:', data);
        setWashHistory(data);
      })
      .catch((error) => {
        console.error('Error fetching wash history:', error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom className="dashboard-title">
        UPCOMING DISCOUNTS
      </Typography>

      {isLoading ? (
        <p>Loading wash history...</p>
      ) : (
        <div>
          <List>
            {washHistory.length > 0 ? (
              washHistory.map((wash, index) => (
                <ListItem key={index} className="wash-history-item">
                  <Grid container alignItems="center" spacing={0}>
                    <Grid item xs={6}>
                      <ListItemText primary={formatDate(wash.date)} />
                    </Grid>
                    <Grid item xs={2}>
                      <div className="wash-history-circle">
                        <div className="wash-history-circle-inner">
                          <span className="wash-history-index">{index + 1}</span>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItemText primary="WASHED" align="right" />
                    </Grid>
                  </Grid>
                </ListItem>
              ))
            ) : (
              <Typography variant="body1">No wash history available.</Typography>
            )}
          </List>
        </div>
      )}
    </Container>
  );
}

export default UserDashboard;
