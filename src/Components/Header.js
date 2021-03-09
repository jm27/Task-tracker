import React from "react";
import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({ showAdd, onAdd }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>Task tracker</h1>
      {location.pathname === "/" && (
        <Button
          handleClick={onAdd}
          className="btn"
          text={showAdd ? "Close" : "Add"}
          color={showAdd ? "orange" : "green"}
        ></Button>
      )}{" "}
    </header>
  );
};

export default Header;
