import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useSelector , useDispatch } from "react-redux";
const Title = () => {
  const user = useSelector((state) => state.userReducer);
  const [presentValue , setPresentValue] = useState(false)
  const dispatch = useDispatch();

  const removeCookie = (key) => {
    if (window !== "undefined") {
      Cookies.remove(key, { expires: 1 });
    }
  };
 const handleClick = async () =>{
 if(user._id){
  await axios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}/api/user/value/logout`,
    withCredentials: true,
  })
    .then(() => removeCookie("jwt"))
    .catch((err) => console.log(err));
  
  window.location = "/profil";
}
}


  /* const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/value/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));
    
    window.location = "/";
  }; */

  return (
    <div className="title">
      <div className="title-second">
        <span className="image-container">
          <img className="imageId bonhomme"  src="/bonHomme.png" alt="Description"></img>
        </span>
        <span className="pseudo-container">Bienvenue {user.pseudo}</span>
        <span className="online-container">
          <img
           className="imageId"
            onClick={handleClick}
            type="submit" 
            src={user._id ? "/connectionImage.jpg" : "/deconnectionImage.jpg"}
            alt="online"
          />
          
        </span>{" "}
      </div>
    </div>
  );
};

export default Title;
