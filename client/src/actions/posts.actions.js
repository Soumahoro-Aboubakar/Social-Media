import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

// comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

// trends
export const GET_TRENDS = "GET_TRENDS";

// errors
export const GET_POST_ERRORS = "GET_POST_ERRORS";

export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const getPosts = (num) => {
    return async (dispatch) => {
      try {
            const res = await axios
                .get(`${process.env.REACT_APP_API_URL}/api/post/`);
            const array = res.data.slice(0, num);
            dispatch({ type: GET_POSTS, payload: array });
            dispatch({ type: GET_ALL_POSTS, payload: res.data });
        } catch (err) {
            return console.log(err);
        }
    };
  };

  export const addPost = (data) => {
    return async (dispatch) => {
      const res = await axios
        .post(`${process.env.REACT_APP_API_URL}/api/post/`, data);
      if (res.data.errors) {
        dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
      } else {
        dispatch({ type: GET_POST_ERRORS, payload: "" });
      }
    };
  };
  

  export const likePost = (postId, userId) => {
    return async (dispatch) => {
      try {
        const res = await axios({
          method: "patch",
          url: `${process.env.REACT_APP_API_URL}/api/post/like-post/` + postId,
          data: { id: userId },
        });
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
      } catch (err) {
        return console.log(err);
      }
    };
  };
  
  export const unlikePost = (postId, userId) => {
    return async (dispatch) => {
      try {
        const res = await axios({
          method: "patch",
          url: `${process.env.REACT_APP_API_URL}/api/post/unlike-post/` + postId,
          data: { id: userId },
        });
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      } catch (err) {
        return console.log(err);
      }
    };
  };

  export const uploadPicture = (data, id) => {
    return async (dispatch)  => {
      return axios
        .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
        .then((res) => {
          if (res.data.errors) {
            dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
          } else {
            dispatch({ type: GET_USER_ERRORS, payload: "" });
            return axios
              .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
              .then((res) => {
                dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
              });
          }
        })
        .catch((err) => console.log(err));
    };
  };
  

  export const updatePost = (postId, message) => {
    return async (dispatch) => {
      try {
        const res = await axios({
          method: "put",
          url: `${process.env.REACT_APP_API_URL}/api/post/${postId}`,
          data: { message },
        });
        dispatch({ type: UPDATE_POST, payload: { message, postId } });
      } catch (err) {
        return console.log(err);
      }
    };
  };


  export const deletePost = (postId) => {
    return async (dispatch) => {
      try {
        const res = await axios({
          method: "delete",
          url: `${process.env.REACT_APP_API_URL}/api/post/${postId}`,
        });
        dispatch({ type: DELETE_POST, payload: { postId } });
      } catch (err) {
        return console.log(err);
      }
    };
  };
 

  export const editComment = (postId, commentId, text) => {
    return async (dispatch) => {
      try {
        const res = await axios({
          method: "patch",
          url: `${process.env.REACT_APP_API_URL}/api/post/edit-comment-post/${postId}`,
          data: { commentId, text },
        });
        dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
      } catch (err) {
        return console.log(err);
      }
    };
  };

  export const addComment = (postId, commenterId, text, commenterPseudo) => {
    return async (dispatch) => {
      try {
        const res = await axios({
          method: "patch",
          url: `${process.env.REACT_APP_API_URL}/api/post/comment-post/${postId}`,
          data: { commenterId, text, commenterPseudo },
        });
        dispatch({ type: ADD_COMMENT, payload: { postId } });
      } catch (err) {
        return console.log(err);
      }
    };
  };

  export const deleteComment = (postId, commentId) => {
    return async (dispatch) => {
      try {
        const res = await axios({
          method: "patch",
          url: `${process.env.REACT_APP_API_URL}/api/post/delete-comment-post/${postId}`,
          data: { commentId },
        });
        dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
      } catch (err) {
        return console.log(err);
      }
    };
  };

  export const getTrends = (sortedArray) => {
    return (dispatch) => {
      dispatch({ type: GET_TRENDS, payload: sortedArray });
    };
  };
  