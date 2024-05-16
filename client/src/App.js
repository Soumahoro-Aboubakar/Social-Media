import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profil from "./pages/Profil";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import axios from "axios";
import { getUser } from "./actions/user.action";
import { createContext } from "react";
import {userIdContext} from './userContext/userContext';
import Title from "./components/title/Title";
import NavLinkComponent from './components/component-left/NavLinkComponent';
import { getUsers } from "./actions/users.action";
import Trending from "./pages/Trending";


const App = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const fetchToken = async () => {
      try {
        await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}/jwtid`,
          withCredentials: true,
        })
          .then((res) => {
            setUserId(res.data);
          })
          .catch((err) => console.log("No token"));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchToken();
    if (userId){
      console.log('avant');
      dispatch(getUser(userId));
      console.log('apres');
    } 
  }, [userId]);
  return (
    <div>
      <header>
       <Title/> 
      </header>
      <main>
        <userIdContext.Provider value={userId}>
          <Router>
            <Routes>
              <Route path="/profil" element={<Profil />} />
              <Route path="/" element={<Profil />} />
              <Route path="/home" element={<Home />} />
              <Route path="/trending" element={<Trending />} />
            </Routes>
          </Router>
        </userIdContext.Provider>
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
