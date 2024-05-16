import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment , getPosts } from "../../../actions/posts.actions";
import FollowHandler from "../../profilComponents/FollowHandler";
import { isEmpty  , timestampParser} from "../../utils/Util";
import EditDeleteComments from "./EditDeleteComments";

const CardComments = ({ post }) => {  
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.pseudo))
        .then(() => dispatch(getPosts()))
        .then(() => setText(''));
    }
  };

  return (
    <div className="comments-container">
      {post.comments.map((comment) => {
        return (
          <div id='cardComment'
            className={
              comment.commenterId === userData._id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="left-part-comment">
              <img className="comment-pic-comment"
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === comment.commenterId) return user.picture;
                      else return null;
                    })
                    .join("")
                }
                alt="commenter-pic"
              />
            </div>
            <div className="right-part-comment">
              <div className="comment-header-comment">
                <div className="pseudo-comment">
                  <h3 className="pseudo-comment">{comment.commenterPseudo}</h3>
                  {comment.commenterId !== userData._id && (
                    <FollowHandler
                      idToFollow={comment.commenterId}
                      type={"card"}
                    />
                  )}
                </div>
                <span className="time">{timestampParser(comment.timestamp)}</span>
              </div>
              <p>{comment.text}</p>
              <EditDeleteComments comment={comment} postId={post._id} />
            </div>
          </div>
        );
      })}
      {userData._id && (
        <form action="" onSubmit={handleComment} className="comment-form-comment">
          <input   className="comment-input-comment"
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <br/>
          <input type="submit" className="btn-comment"  value="Envoyer" />
        </form>
      )}
    </div>
  );
};

export default CardComments;
