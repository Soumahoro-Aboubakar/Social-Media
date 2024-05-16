import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/user.action";
import { dateParser } from "../utils/Util";
import FollowHandler from "./FollowHandler";
import UploadImage from "./UploadImage";

const UploadAndBio = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const user = useSelector((state) => state.userReducer)
  const users = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const handleUpdate = () => {
    dispatch(updateBio(user._id, bio));
    setUpdateForm(false);
  };
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);


  return (
    <div className="uploadAndBio-container">
      <div className="userName text-center">Profil de {user.pseudo}</div>
      <div className="container-user-informcation">
        <div className="left-part">
          <h2 className="textProfil">Photo de profil</h2>
          <img
            className="userPicture"
            src={user.picture ? user.picture : "./bonHomme.png"}
            alt="user-pic"
          />
          <UploadImage />
        </div>
        <div className="right-part">
          <h3 className="text-center">bio</h3>
          {updateForm === false && (
            <>
              <p
                className="text-center"
                onClick={() => setUpdateForm(!updateForm)}
              >
                {user.bio ? user.bio : "entrer quelque chose"}
              </p>
              <button
                className="btn-changeBio"
                onClick={() => setUpdateForm(!updateForm)}
              >
                Modifier bio
              </button>
            </>
          )}
          {updateForm && (
            <>
              <textarea
                type="text"
                defaultValue={user.bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
              <button className="btn-valider" onClick={handleUpdate}>
                Valider modifications
              </button>
            </>
          )}
          <h4 className="dateOfCreatingCount">Membre depuis le : {dateParser(user.createdAt)}</h4>
          <h5 className="abonnementAndAbonne" onClick={() => setFollowingPopup(true)}>
            Abonnements : {user.following ? user.following.length : ""}
          </h5>
          <h5 className="abonnementAndAbonne" onClick={() => setFollowersPopup(true)}>
            Abonnés : {user.followers ? user.followers.length : ""}
          </h5>
          {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>
            <span className="cross" onClick={() => setFollowingPopup(false)}>
              &#10005;
            </span>
            <ul>
              {users.map((userOfUsers) => {
                for (let i = 0; i < user.following.length; i++) {
                  if (userOfUsers._id === user.following[i]) {
                    return (
                      <li key={userOfUsers._id}>
                        <img src={userOfUsers.picture} alt="user-pic" />
                        <h4>{userOfUsers.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler idToFollow={userOfUsers._id} />
                        </div>
                      </li>
                    );
                  }
                }
              })}
            </ul>
          </div>
        </div>
      )}
      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnés</h3>
            <span className="cross" onClick={() => setFollowersPopup(false)}>
              &#10005;
            </span>
            <ul>
              {users.map((userOfUsers) => {
                for (let i = 0; i < user.followers.length; i++) {
                  if (userOfUsers._id === user.followers[i]) {
                    return (
                      <li key={userOfUsers._id}>
                        <img src={userOfUsers.picture} alt="user-pic" />
                        <h4>{userOfUsers.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler idToFollow={userOfUsers._id} />
                        </div>
                      </li>
                    );
                  }
                }
              })}
            </ul>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default UploadAndBio;
