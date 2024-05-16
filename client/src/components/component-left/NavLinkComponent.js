import React from "react";
import { Link } from "react-router-dom";

const NavLinkComponent = () => {



  
  return (
    <div className="navComponent-container">
      <div className="home" id="homeBtn">
        {" "}
        <Link to="/home">
          {" "}
          <span className="transition"></span>
          <img
            src="./home.png"
            type="submit" 
            className="container"
            alt="home"
          ></img>
        </Link>{" "}
      </div>
      <div className=" avion">
        {" "}
        <Link to="/profil">
          <span className="transition"></span>
          <img
            src="./avion.png"
            type="submit"
            className="container"
            alt="avion"
          ></img>
        </Link>{" "}
      </div>
      <div className="trending">
        {" "}
        <Link to="/trending">
          <span className="transition"></span>
          <img
            src="./btnTrending.png"
            type="submit"
            className="container"
            alt="trending"
          ></img>
        </Link>{" "}
      </div>
    </div>
  );
};

export default NavLinkComponent;
