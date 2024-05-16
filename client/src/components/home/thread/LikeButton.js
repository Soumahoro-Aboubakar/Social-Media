import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../../actions/posts.actions";
import { userIdContext } from "../../../userContext/userContext";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const userId = useContext(userIdContext);

  useEffect(() => {
    if (post.likers.includes(userId)) setLiked(true);
    else setLiked(false);
  }, [userId]);
  const like = () => {
    dispatch(likePost(post._id, userId));
    setLiked(true);
  };
  const unlike = () => {
    dispatch(unlikePost(post._id, userId));
    setLiked(false);
  };
  return (
    <div>
      {liked ? (
        <img
          onClick={unlike}
          src="imageProjet/liked.png"
          className="icon"
          alt="aimé"
        />
      ) : (
        <img
          onClick={like}
          className="icon"
          src="imageProjet/like.png"
          alt="aime"
        />
      )}{" "}
      <span>{post.likers.length}</span>
    </div>
  );
};

export default LikeButton;
