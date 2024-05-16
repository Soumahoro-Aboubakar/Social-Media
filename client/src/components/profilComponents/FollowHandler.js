import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts.actions";
import { followUser, getUser, unfollowUser } from "../../actions/user.action";
import { isEmpty } from "../utils/Util";

const FollowHandler = ({ idToFollow , type }) => {
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();
  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow));
    setIsFollowed(false);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        console.log(typeof(userData.following))
        setIsFollowed(true);
      } else setIsFollowed(false);
    } else setIsFollowed(false);
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnfollow}>
           {type === "suggestion" && <button className="unfollow-btn">Abonné</button>}
          {type === "card" && <img src="./imageProjet/checked.png" className="icon follow-icon  icon-comment"  alt="checked"/>}
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
         {type === "suggestion" && <button className="follow-btn">Suivre</button>}
          {type === "card" && <img src="./imageProjet/emptyCheck.png" className="icon follow-icon icon-comment" alt="check"/>}
        </span>
      )}
    </>
  );
};

export default FollowHandler;
