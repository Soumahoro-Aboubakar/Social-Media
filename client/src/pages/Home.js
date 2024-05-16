import React, { useContext } from "react";
import { useSelector } from "react-redux";
import NavLinkComponent from "../components/component-left/NavLinkComponent";
import NewPostForm from "../components/home/NewPostForm";
import Threads from "../components/home/Threads";
import Trends from "../components/home/trending/Trends";
import { userIdContext } from "../userContext/userContext";

const Home = () => {
  const user = useSelector((state) => state.userReducer);
  const id = useContext(userIdContext)
  /* */
  return (
    <>
      <NavLinkComponent/>
    <div className="home">
       <NewPostForm/>
      <div className="right-part">
        <div className="home-header">
           <Threads/> 
        </div>
      </div>
    </div>
    <div className="trending-part">
         <Trends/> 
     </div>
    </>
    )

};
export default Home;
