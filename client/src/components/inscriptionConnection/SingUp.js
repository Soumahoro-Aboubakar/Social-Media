import React, { useState } from "react";
import axios from "axios";

const SingUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange_email = (e) => {
    setEmail(() => {
      return e.target.value;
    });
  };

  const connected = async (e) => {
    e.preventDefault();

    const emailError = document.getElementById("errorEmail");
    const passwordError = document.getElementById("errorPassword");
 alert()
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/user/login`,
        withCredentials: true,
        data: {
          email,
          password,
        },
      });
      console.log(res);
      if (res.data.errors) {
        emailError.innerHTML = res.data.errors.email;
        passwordError.innerHTML = res.data.errors.password;
      } else {
        window.location = "/profil";
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange_password = (e) => {
    setPassword(() => {
      return e.target.value;
    });
  };
  return (
    <div className="connection">
      <form onSubmit={connected}>
        <label htmlFor="email" className="text-center">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={handleChange_email}
        />
        <div className="text-center text-danger" id="errorEmail"></div>
        <label htmlFor="nom" className="text-center">
          Mot de passe.
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={handleChange_password}
        />
        <div className="text-center text-danger" id="errorPassword"></div>
        <button type="submit" className="btn btn-success mb-2">
          Valider inscription
        </button>
      </form>
    </div>
  );
};

export default SingUp;
