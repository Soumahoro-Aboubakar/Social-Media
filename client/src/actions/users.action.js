import axios from "axios";

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const res = await axios
        .get(`${process.env.REACT_APP_API_URL}/api/user`);
      dispatch({ type: GET_USERS, payload: res.data });
    } catch (err) {
      return console.log(err);
    }
  };
};
