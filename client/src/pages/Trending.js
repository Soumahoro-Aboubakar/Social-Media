import React, { useContext } from "react";
import { useSelector } from "react-redux";

import NavLinkComponent from "../components/component-left/NavLinkComponent";
import { isEmpty } from "../components/utils/Util";
import Card from "../components/home/thread/Card";
import { userIdContext } from "../userContext/userContext";
import FriendsHint from "../components/home/trending/FriendsHint";
import Trends from "../components/home/trending/Trends";

const Trending = () => {
  const uid = useContext(userIdContext);
  const trendList = useSelector((state) => state.trendingReducer);

  return <div className="trending-page">
  <NavLinkComponent/>
    <div className="main">
      <ul>
        {!isEmpty(trendList[0]) && trendList.map((post) => <Card post={post} key={post._id} />)}
      </ul>
    </div>
    <div className="right-side">
      <div className="right-side-container">
        <Trends />
        {uid && <FriendsHint />}
      </div>
    </div>
  </div>;
};

export default Trending;
