import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../actions/posts.actions";


const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(deletePost(props.id));

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?")) {
          deleteQuote();
        }
      }}
    >
      <img src="./imageProjet/delete.png" className="icon" alt="trash" />
    </div>
  );
};

export default DeleteCard;
