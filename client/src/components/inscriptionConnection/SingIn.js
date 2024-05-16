import React, { useState } from "react";
import SingUp from "./SingUp";
import axios from "axios";
const SingIn = () => {
  //  pseudo, email,password
  const [activePage, setActivepage] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_Confirm, setPassword_Confirm] =
    useState("");
  const [inputValue_CheckBox, setInputValue_CheckBox] = useState(false);

  const handleChange_Name = (e) => {
    setPseudo(e.target.value);
  };

  const handleChange_Email = (e) => {
    setEmail(e.target.value);
  };
  const handleChange_password = (e) => {
    setPassword(e.target.value);
  };
  const handleChange_Password_Confirm = (e) => {
    setPassword_Confirm(e.target.value);
  };

  const handleClick_CheckBox = (e) => {
    setInputValue_CheckBox(true);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const errorName = document.getElementById("errorName");
    const errorEmail = document.getElementById("errorEmail");
    const errorPassword = document.getElementById("errorPassword");
    const errorconfirmPassword = document.getElementById(
      "errorConfirmPassword"
    );
    const errorCheckBox = document.getElementById("errorCheckbox");
     console.log(password);
     console.log(password_Confirm);
      errorconfirmPassword.innerHTML='';
      errorPassword.innerHTML=''

          if ( pseudo==='' || password===''|| password_Confirm===''){
            errorName.innerHTML='veuillez remplir les cahmps '
            return;
           }
        
    if (
      password !== password_Confirm ||
      !inputValue_CheckBox 
    ) {
      if (password !== password_Confirm )
        errorconfirmPassword.innerHTML =
          "Les mots de passe ne correspondent pas";
      if (!inputValue_CheckBox)
        errorCheckBox.innerHTML = "Veuillez valider les conditions générales";
    } else {

         alert(process.env.REACT_APP_API_URL + ' value of port')
      await axios.post(`${process.env.REACT_APP_API_URL}/api/user/register`,{
        //REACT_APP_API_URL = 'http://localhost:5000/api/user/register'
        data: { 
          pseudo,
          email,
          password,
        }
      })
        .then((res) => {
          console.log(res)
        if (res.data.errors) {
            errorName.innerHTML  = res.data.errors.pseudo;
            errorEmail.innerHTML = res.data.errors.email;
            errorPassword.innerHTML = res.data.errors.password;
          } else {
           setActivepage(true);
          }
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <div className="inscription">
      {activePage ? (
        <>
          {" "}
          <SingUp />
          <span></span>
          <h4 className="text-success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="nom" className="text-center">
              Entrez votre nom
            </label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange_Name}
              value={pseudo}
              id="inputNom"
            />
            <div className="text-center text-danger" id="errorName"></div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="text-center">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inpuEmail"
              value={email}
              onChange={handleChange_Email}
            />
            <div className="text-center text-danger" id="errorEmail"></div>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="text-center">
              Mot de passe
            </label>
            <input type="password" onChange={handleChange_password} value={password} className="form-control" id="password" />
            <div className="text-center text-danger" id="errorPassword"></div>
          </div>
          <div className="form-group">
            <label htmlFor="nom" className="text-center">
              Confirmer Mot de passe
            </label>
            <input
              type="text"
              className="form-control"
              id="confirmPassword"
              value={password_Confirm}
              onChange={handleChange_Password_Confirm}
            />
            <div
              className="text-center  text-danger"
              id="errorConfirmPassword"
            ></div>
          </div>

          <div className="form-check">
            <input
              className="form-check-input "
              type="checkbox"
              onClick={handleClick_CheckBox}
              id="flexCheckDefault"
              disabled={inputValue_CheckBox}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              J'accepte les <a href="/#">conditions générales</a>
              <div
                className="text-center  text-danger "
                id="errorCheckbox"
              ></div>
            </label>
            <button type="submit" className="btn btn-success mb-2">
              Valider inscription
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SingIn;