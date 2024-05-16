
  import axios from "axios";


export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const getUser = (userId) =>{

  return  async (dispatch)=>{
      try {
          const res =  await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${userId}`);
          dispatch({type: GET_USER, payload: res.data.user})
      } catch (error) {
          return console.log(error);
      }
  }
}



export const uploadPicture = (data, id) => {
    return async (dispatch) => {
      try {
        const res = await axios
          .post(`${process.env.REACT_APP_API_URL}/api/user/upload`, data);
      /*   const res_1 = await axios
          .get(`${process.env.REACT_APP_API_URL}/api/user/${id}`);
        dispatch({ type: UPLOAD_PICTURE, payload: res_1.data.picture }); */
        console.log('image envoyé')
      } catch (err) {
        return console.log(err);
      }
    };
  }; 

  export const updateBio = (userId, bio) => {
    return async (dispatch) => {
      try {
        const res = await axios({
          method: "put",
          url: `${process.env.REACT_APP_API_URL}/api/user/` + userId,
          data:  {bio} ,
        });
          dispatch({ type: UPDATE_BIO, payload: res.data.bio});
      } catch (err) {
        return console.log(err);
      }
    };
  };


  export const followUser = (followerId, idToFollow) => {
    return async (dispatch) => {
      try {
        const res = await axios({
          method: "patch",
          url: `${process.env.REACT_APP_API_URL}/api/user/follow/` + idToFollow,
          data: { followerId  } ,
        });
        dispatch({ type: FOLLOW_USER, payload: { idToFollow } });
      } catch (err) {
        return console.log(err);
      }
    };
  };

  
  export const unfollowUser = (followerId, idToUnfollow) => {
    return async (dispatch) => {
      try {
        const res = await axios({
          method: "patch",
          url: `${process.env.REACT_APP_API_URL}/api/user/unfollow/` + idToUnfollow,
          data:  { followerId }
        });
        dispatch({ type: UNFOLLOW_USER, payload: { idToUnfollow } });
      } catch (err) {
        return console.log(err);
      }
    };
  };