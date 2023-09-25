// import { FaBars } from "react-icons/fa";

import React from "react";

function Header() {
  return (
    <header
      style={{
        background: "white",
        padding: "10px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: "0px",
      }}
      className="header"
    >
      <h1 className="carwash-h">Shufti</h1>
    </header>
  );
}

export default Header;
