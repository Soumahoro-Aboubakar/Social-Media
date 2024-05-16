import postModel from "../models/post.model.js";
import UserModel from "../models/user.Model.js";
import express from "express";
import multer from "multer";
const upload = multer();
import { postData } from "../controller/postData.js";
import mongoose from 'mongoose';
const ObjectID = mongoose.Types.ObjectId;

const routerPost = express.Router();

// permet to send to frontend all posts
routerPost.get("/", async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
  await postModel
    .find()
    .sort({ createdAt: -1 })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json(error));
});

// permet to add post user id
routerPost.put("/:id", async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
  try {
    const data = await postModel.findByIdAndUpdate(
      req.params.id,
      { $set: { message: req.body.message } },
      { new: true }
    );
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// permet to delete a post by user id
routerPost.delete("/:id" , async (req,res)=>{
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
     await postModel.findByIdAndRemove(req.params.id)
     .then(()=>(
      res.status(200).json('success deleting')
        ))
       .catch((error)=>(
         res.status(400).json("Error occure " + error)
        ))
})


//permet to like post by user id
routerPost.patch("/like-post/:id" , async (req,res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
    await postModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true })
      .then((data) =>  res.status(201).send(data))
      .catch((err) => res.status(500).send({ message: err }));
      await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true })
            .then()
            .catch((err) => res.status(500).send({ message: err }));
})


// permet to unlike post by user id
routerPost.patch("/unlike-post/:id" , async (req,res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
   await postModel.findByIdAndUpdate(
     req.params.id,
     {
       $pull: { likers: req.body.id },
     },
     { new: true })
     .then((data) =>  res.status(201).send(data))
     .catch((err) => res.status(500).send({ message: err }));
     await UserModel.findByIdAndUpdate(
     req.body.id,
     {
       $pull: { likes: req.params.id },
     },
     { new: true })
           .then()
           .catch((err) => res.status(500).send({ message: err }));
})



// permet to comment post by user id
routerPost.patch('/comment-post/:id' , (req ,res)=>{
   if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
 
try {
  return postModel.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        comments: {
          commenterId: req.body.commenterId,
          commenterPseudo: req.body.commenterPseudo,
          text: req.body.text,
          timestamp: new Date().getTime(),
        },
      },
    },
    { new: true })
          .then((data) => res.send(data))
          .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
      return res.status(400).send(err);
  }
})

//permet to edit post by user id
routerPost.patch('/edit-comment-post/:id' , (req ,res)=>{
   if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id); 

try {
  return postModel.findById(req.params.id, (err, docs) => {
    const theComment = docs.comments.find((comment) =>
      comment._id.equals(req.body.commentId)
    );

    if (!theComment) return res.status(404).send("Comment not found");
    theComment.text = req.body.text;

    return docs.save((err) => {
      if (!err) return res.status(200).send(docs);
      return res.status(500).send(err);
    });
  });
} catch (err) {
  return res.status(400).send(err);
}
})

// permet to delete a post by user id
routerPost.patch('/delete-comment-post/:id' , (req ,res)=>{
   if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id); 

try {
  return postModel.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        comments: {
          _id: req.body.commentId,
        },
      },
    },
    { new: true })
          .then((data) => res.send(data))
          .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
      return res.status(400).send(err);
  }
})

// permet to post file 
routerPost.post("/", upload.single("file"), postData);

export default routerPost;
