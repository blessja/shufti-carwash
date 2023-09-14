import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  console.log(user);
  if (!user) {
    // Handle the case when the user object is undefined or null
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
      <h4 style={{color: "#045293",
              fontFamily: "Montserrat",
              fontWeight: "bolder"}}>{user.name}</h4> {/* Make sure 'user' and 'name' exist before accessing */}
      {/* <p>Name: {user.Name}</p> */}
      <p >Phone: {user.phone}</p>
      <p style={{color: '#4682B4'}}>{user.car}</p>
      <Link style={{color: '#FB0728', textDecoration: 'underline', opacity: '1', }} to={`/users/${user._id}`}>Register a Wash</Link>
      </div>
     
    </div>
  );
};

export default UserCard;