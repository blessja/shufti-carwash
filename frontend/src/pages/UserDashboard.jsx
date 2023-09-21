import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


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
  

  return (
    <div>
      <h2>User Dashboard</h2>
      {isLoading ? (
        <p>Loading wash history...</p>
      ) : (
        <div>
          <h3>Wash History</h3>
          {washHistory.length > 0 ? (
            <ul>
              {washHistory.map((wash, index) => (
                <li key={index}>
                  <p>Date: {wash.date}</p>
                  <p>Washed: {wash.washed}</p>
                  {/* Add more details as needed */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No wash history available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;


// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Grid from '@material-ui/core/Grid';
// import Axios from 'axios';

// function UserDashboard() {
//   const { userId, carWashId } = useParams();
//   const [userInfo, setUserInfo] = useState(null);
//   const [washHistory, setWashHistory] = useState([]);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async (userId) => {
//       try {
//         // Fetch user data
//         const userResponse = await Axios.get(`https://shufti-carwash-server.vercel.app/api/users/${userId}`);
//         const userData = userResponse.data;

//         if (userResponse.status !== 200) {
//           setError('Error fetching user data.');
//           return;
//         }

//         // Fetch wash history
//         const historyResponse = await Axios.get(`https://shufti-carwash-server.vercel.app/api/users/${userId}/wash-history`);
//         const historyData = historyResponse.data;

//         if (historyResponse.status !== 200) {
//           setError('Error fetching wash history.');
//           return;
//         }

//         setUserInfo(userData);
//         setWashHistory(historyData);
//       } catch (error) {
//         setError('Error fetching user data.');
//         console.error('Error:', error.message);
//       }
//     };

//     // Fetch user data and wash history when the component mounts
//     if (userId && carWashId) {
//       fetchUserData(userId);
//     }
//   }, [userId, carWashId]);


//   const formatDate = (dateString) => {
//     const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const getNextWashNumber = () => {
//     const lastWashNumber = washHistory.length;
//     return lastWashNumber + 1;
  
//   };

//   console.log(getNextWashNumber);

//   const onLogout = () => {
   
//     navigate(`/${carWashId}/dashboard`);

//   };


//   return (
//     <Container maxWidth="sm">


//       {userInfo ? (
//         <div>

//           <Typography variant="h5" gutterBottom style={{ color: '#4682B4', marginTop: '30px', marginBottom: '60px' }}>
//             UPCOMING DISCOUNTS
//           </Typography>


//           {washHistory.length > 0 ? (
//             <List>
//               {washHistory.map((wash, index) => (
//                 <ListItem key={wash._id} style={{ color: '#12F329' }} >
//                   <Grid container alignItems="center" spacing={0}>
//                     <Grid item xs={6}>
//                       <ListItemText primary={formatDate(wash.date)} />
//                     </Grid>
//                     <Grid item xs={2}>
//                       <div style={{ position: 'relative', display: 'inline-block', backgroundColor: '#12F329', borderRadius: '50%', width: '40px', height: '40px', }}>
//                         <div style={{ position: 'absolute', top: '50%', left: '50%', backgroundColor: '#12F329', transform: 'translate(-50%, -50%)' }}>
//                           <span style={{ fontWeight: 'bold', backgroundColor: '#12F329', color: 'white' }}>{index + 1}</span>
//                         </div>
//                       </div>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <ListItemText primary="WASHED" align="right" />
//                     </Grid>
//                   </Grid>
//                 </ListItem>
//               ))}
//             </List>
//           ) : (
//             <Typography variant="body1">No wash history available.</Typography>
//           )}
        
//         </div>
//       ) : (
//         <Typography variant="body1">{error ? error : 'Loading user information...'}</Typography>
//       )}
//       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px',  }}>
//         <button className="btn btn-block" onClick={onLogout}>
//           EXIT
//         </button>
//       </div>

//     </Container>
//   );
// }

// export default UserDashboard;


