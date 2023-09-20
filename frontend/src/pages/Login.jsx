import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.pathname.split('/').pop(); // Extract the car wash ID from the URL
  const { carWashId } = useParams(); // Get the car wash ID from the URL


  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });

  const { phone, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://shufti-carwash-server.vercel.app/api/users/${carWashId}/login`, {
        phone,
        password,
      });

      // Process the login response, e.g., store the token
      console.log('User login successful:', response.data);

      // Redirect to the staff dashboard or any other desired page
           navigate(`/user/dashboard/${userId}`);

    } catch (error) {
      console.error('Error logging in as staff:', error);
      toast.error('Login failed');
    }
  };

  return (
    <>
      <section className="heading">
        <h1 style={{ fontSize: '23px', fontWeight: '600', paddingTop: '20px' }} className="login-title">
          LOG IN
        </h1>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="phone"
              className="form-control"
              id="phone"
              name="phone"
              value={phone}
              placeholder="Cell Number"
              onChange={onChange}
              autoComplete="yes"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
              autoComplete="yes"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              LOG IN
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;



// import { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import Spinner from '../components/Spinner';

// function Login() {
//   const [formData, setFormData] = useState({
//     phone: '',
//     password: '',
//   });

//   const { phone, password } = formData;

//   const navigate = useNavigate();
//   const { carWashId } = useParams(); // Get the car wash ID from the URL

//   const [isLoading, setIsLoading] = useState(false);

//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
  
//     const userData = {
//       phone,
//       password,
//     };
  
//     try {
//       const response = await fetch(`https://shufti-carwash-server.vercel.app/api/users/${carWashId}/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message);
//       }
  
//       const responseData = await response.json(); // Parse the response JSON
  
//       setIsLoading(false);
//       toast.success('Login successful');
  
//       // Extract the user ID from the response data
//       const userId = responseData._id || ''; // Assuming the user ID is stored in the "_id" field
  
//       // Redirect the user to the dashboard with the extracted user ID
//       navigate(`/user/dashboard/${userId}`);
//     } catch (error) {
//       setIsLoading(false);
//       console.error(error); // Log the error for debugging
//       toast.error('Login failed. Please check your credentials.');
//     }
//   };
  

//   if (isLoading) {
//     return <Spinner />;
//   }

//   return (
//     <>
//         <section className='heading'>
//         <h1 style={{fontSize: "23px", fontWeight: "600", paddingTop: "20px"}} className='login-title'>
//         LOG IN
//         </h1>
       
//       </section>

//       <section className='form'>
//         <form onSubmit={onSubmit}>
//           <div className='form-group'>
//             <input
//               type='phone'
//               className='form-control'
//               id='phone'
//               name='phone'
//               value={phone}
//               placeholder='Cell Number' 
//               onChange={onChange}
//               autoComplete='on'
//             />
//           </div>
//           <div className='form-group'>
//             <input
//               type='password'
//               className='form-control'
//               id='password'
//               name='password'
//               value={password}
//               placeholder='Password'
//               onChange={onChange}
//               autoComplete='on'
//             />
//           </div>

//           <div className='form-group'>
//             <button type='submit' className='btn btn-block'>
//               LOG IN
//             </button>
//           </div>
//         </form>
//       </section>
//     </>
//   );
// }

// export default Login;
