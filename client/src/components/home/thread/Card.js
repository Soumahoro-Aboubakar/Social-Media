import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../../actions/posts.actions';
import FollowHandler from '../../profilComponents/FollowHandler';
import { dateParser, isEmpty } from '../../utils/Util';
import CardComments from './CardComments';
import DeleteCard from "./DeleteCard"
import LikeButton from './LikeButton';

const Card = ({post}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
  
    const updateItem = () => {
       if (textUpdate) {
        console.log(post._id + ' id value')
        dispatch(updatePost(post._id, textUpdate));
       
      } 
      setIsUpdated(false);
    };
  
    useEffect(() => {
      !isEmpty(usersData[0])  && setIsLoading(false);
    }, [usersData]); 
    return (
        <div className='card-container'>
          {
          isLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            <>
            <div className='card-left'>
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.picture;
                    else return null;
                  })
                  .join("")
              } 
              id='card-left-img'
              alt="poster-pic"
            />
            </div>

            <div className='card-right'>
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) return user.pseudo;
                        else return null;
                      })
                     }
                </h3>
               <span> {post.posterId !== userData._id && (
                  <FollowHandler idToFollow={post.posterId} type={"card"} />
                )}</span>
              </div>
              <span className='hour'>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p className='message'>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea className='editComment' 
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider modification
                  </button>
                </div> 
              </div>
            )}  {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-picture" />
            )}
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )}
              {userData._id === post.posterId && (
              <div className="button-container-footer">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./imageProjet/edit.png" className='icon' id="editAndDelete" alt="edit" />
                </div>
                <DeleteCard id={post._id} />
              </div>
            )}
             <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./imageProjet/comment.png"  id="comment"  className='icon'
                  alt="comment"
                />
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
              <img   src="./imageProjet/share.png" className='icon' alt="share" />
            </div>
            {showComments && <CardComments post={post} />}
            </div>
            </>
            )      
          } 
        </div>
    );
};

export default Card;