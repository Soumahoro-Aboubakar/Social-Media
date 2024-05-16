import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment , editComment} from "../../../actions/posts.actions";
import { userIdContext } from "../../../userContext/userContext";

const EditDeleteComments = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(userIdContext);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(postId, comment._id, text));
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => {dispatch(deleteComment(postId, comment._id));} 

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId]);

  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./imageProjet/edit.png" className="icon-comment" alt="edit-comment" />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label  htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <br />
          <input  className="edit-input"
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <br />
          <div className="btn-edit-detele">
            <span
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }}
            >
              <img src="./imageProjet/delete.png" className="icon-comment delete-btn" alt="delete" />
            </span>
            <input type="submit"  className="modifi-btn" value="Valider modification" />
          </div>
        </form> 
      )}
    </div>
  );
};

export default EditDeleteComments;
