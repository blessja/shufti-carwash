import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const RegistrationForm = () => {
  const { carWashId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });

  const { name, location } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      location,
    };

    try {
      const response = await axios.post(
        "https://shufti-carwash-server.vercel.app/api/carwashes",
        userData
      );
      toast.success("Registration successful");
      console.log(response);
      navigate("/");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <section
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
        className="heading"
      >
        <h4>REGISTER NEW CARWASH</h4>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="name"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Car Wash's name"
              onChange={handleChange}
              autoComplete="on"
            />
          </div>
          <div className="form-group">
            <input
              type="location"
              className="form-control"
              id="location"
              name="location"
              value={location}
              placeholder="Enter the location of the car wash"
              onChange={handleChange}
              autoComplete="on"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default RegistrationForm;
