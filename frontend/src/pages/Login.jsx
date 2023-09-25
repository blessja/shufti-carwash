import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

const Login = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  const { carWashId } = useParams(); // Get the car wash ID from the URL

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
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
      const response = await axios.post(
        `https://shufti-carwash-server.vercel.app/api/users/${carWashId}/login`,
        {
          phone,
          password,
        }
      );
      // Process the login response, e.g., store the token
      console.log("User login successful:", response.data);
      const userId = response.data._id || "";
      // Redirect to the staff dashboard or any other desired page
      navigate(`/user/dashboard/${userId}/${carWashId}`);
    } catch (error) {
      console.error("Error logging in as staff:", error);
      toast.error("Login failed");
    }
  };

  return (
    <>
      <Header />
      <section className="heading">
        <h1
          style={{ fontSize: "23px", fontWeight: "600", paddingTop: "20px" }}
          className="login-title"
        >
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
