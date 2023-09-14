import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginModal = ({ isShowLogin, carwashId }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(`/staff/login/${carwashId}/login`);
  };
  

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className={`${isShowLogin ? "active" : ""} show`}
    >
      <div className="login-form">
        <div className="form-box solid">
        <button type="submit" className="btn btn-block" style={{color: "#fff"}} onClick={() => navigate(`/staff/login/${carwashId}`)}>Carwash Login</button>
        <button type="submit" className="btn btn-block" style={{color: "#fff"}} onClick={() => navigate(`/login/${carwashId}`)}>Customer Login</button>
          {/* Customer Login button */}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
