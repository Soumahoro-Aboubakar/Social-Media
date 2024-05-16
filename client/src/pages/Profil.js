import React, { useState } from "react";
import { useSelector } from "react-redux";
import NavLinkComponent from "../components/component-left/NavLinkComponent";
import SingIn from "../components/inscriptionConnection/SingIn";
import SingUp from "../components/inscriptionConnection/SingUp";
import UploadAndBio from "../components/profilComponents/UploadAndBio";
const Profil = () => {
  const user = useSelector((state) => state.userReducer);
  const [value, setValue] = useState(false);
  const handleCLick = (e) => {
    if (e.target.id === "premiereImage") {
      setValue(() => {
        return true;
      });
    } else if (e.target.id === "deuxiemeImage") {
      setValue(() => {
        return false;
      });
    }
  };
  return (
    <div className="container profil" id="profil">
     { user._id && <NavLinkComponent/> }
      {user._id ? (
        <>
         { <UploadAndBio />}
        </>
      ) : (
        <div className="row my-5">
          <div className="col premier">
            <div className="row">
              <div className="col my-3">
                {""}
                <ul className="my-5 profil2">
                  <li
                    id="premiereImage"
                    className={value ? "defaut" : "null"}
                    onClick={handleCLick}
                  >
                    S'inscrire
                  </li>
                  <li
                    id="deuxiemeImage"
                    className={value ? " null" : "defaut"}
                    onClick={handleCLick}
                  >
                    Se connecter{" "}
                  </li>
                </ul>
              </div>
              <div className="col deuxieme ">
                {value ? <SingIn /> : <SingUp />}
              </div>
            </div>
          </div>
          <div className="col  materiel "> 
            {" "}
            {value ? (
              <img
                id="premiereImageOrdinateur"
                src="./ordinateurCadena.jpg"
                alt="description"
              />
            ) : (
              <img
                id="deuxiemeImageOrdinateur"
                src="./motPass.jpg"
                alt="description"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
