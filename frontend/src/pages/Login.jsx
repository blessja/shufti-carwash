import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

function Login() {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });

  const { phone, password } = formData;

  const navigate = useNavigate();
  const { carWashId } = useParams(); // Get the car wash ID from the URL

  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userData = {
      phone,
      password,
    };

    try {
      const response = await fetch(`https://shufti-carwash-server.vercel.app/api/users/${carWashId}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setIsLoading(false);
      toast.success('Login successful');

      // Redirect or perform any other action upon successful login
      const userId = ''; // Replace with the user ID if applicable
      navigate(`/${carWashId}/user/dashboard/${userId}`);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
        <section className='heading'>
        <h1 style={{fontSize: "23px", fontWeight: "600", paddingTop: "20px"}} className='login-title'>
        LOG IN
        </h1>
       
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='phone'
              className='form-control'
              id='phone'
              name='phone'
              value={phone}
              placeholder='Cell Number' 
              onChange={onChange}
              autoComplete='on'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Password'
              onChange={onChange}
              autoComplete='on'
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              LOG IN
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;



// import { useState, useEffect } from 'react';

// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { login, reset } from '../features/auth/authSlice';
// import Spinner from '../components/Spinner';

// function Login() {
//   const [formData, setFormData] = useState({
//     phone: '',
//     password: '',
//   });

//   const { phone, password } = formData;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { carWashId } = useParams(); // Get the car wash ID from the URL

//   const { user, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     if (isError) {
//       toast.error(message);
//     }

//     if (isSuccess || user) {
//       const userId = user?.id || ''; // Ensure user.id is defined or set it to an empty string
//       navigate(`/${carWashId}/user/dashboard/${userId}`); // Include the car wash ID in the URL
//     }

//     dispatch(reset());
//   }, [user, isError, isSuccess, message, navigate, dispatch, carWashId]);

//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     const userData = {
//       phone,
//       password,
//     };

//     dispatch(login(userData));
//   };

//   if (isLoading) {
//     return <Spinner />;
//   }

//   return (
//     <>
//      <section className='heading'>
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
