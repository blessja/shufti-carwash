import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import myImage from '../images/shufti.png'

const Dashboard = ({carwashId}) => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [carWash, setCarWash] = useState(null);

  const handleClick = () => {
    handleLoginClick();
  };

  const [isShowLogin, setIsShowLogin] = useState(true);

  const handleLoginClick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin);
  };
  useEffect(() => {
    // Fetch car wash data using the `id` parameter
    fetchCarWashData(id);
  }, [id]);

  const fetchCarWashData = async (carWashId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/carwashes/${carWashId}`);
      // Process the response data
      
      setCarWash(response.data);
    } catch (error) {
      console.error('Error fetching car wash data:', error);
    }
  };



  return (
    <>
      <section className='heading'>
        <div className="main_image ">
          <img src={myImage} alt="carwash" style={{ width: '100%' }} />
       
        </div>
        <div style={{marginTop: '30px', alignItems: 'center'}} className="carwashname">
          <p style={{fontSize: '27px', fontWeight: "bold", color: 'black'}}>Welcome to</p>
          <p style={{fontSize: '40px', fontWeight: 'bold',}}>{carWash?.name}</p>
        </div>
        <div style={{display: 'flex',marginTop: '30px', justifyContent: 'center' }} className="btns">
          <button style={{ marginRight: '20px'}}  className='btn ' onClick={() => navigate(`/login/${id}`)}>Customer Login</button>
          <button className='btn ' onClick={() => navigate(`/staff/login/${id}`)}>Carwash Login</button>
        </div>
     
       
        
      </section>
   
    </>
  );
}
export default Dashboard;
