import React from "react";
import Header from "../components/HeaderMain";
import myImage from "../images/shufti.png";

function Home() {
  return (
    <>
      <Header />
      <div>
        <img src={myImage} alt="carwash" style={{ width: "100%" }} />
      </div>
    </>
  );
}

export default Home;
