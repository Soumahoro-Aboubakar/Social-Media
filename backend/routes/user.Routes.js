import express from "express";
import { signUpErrors, uploadErrors } from "../auth.error/errors.utils.js";
import UserModel from "../models/user.Model.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import { fileData } from "../controller/data.file.js";
import mongoose from 'mongoose';
const ObjectID = mongoose.Types.ObjectId;
const upload = multer();

const route = express.Router();
const maxAge = 3 * 24 * 60 * 60 * 1000;


//  user info authentification
// get all user s
route.get("/", async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
});


// post in api/user/register
route.post("/register", async (req, res) => {
  const { pseudo, email, password } = JSON.parse(JSON.stringify(req.body)).data;
  try { 
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    console.log('error')
    res.status(500).send({ errors });
  }
});
// post in api/user/login
route.post("/login", async (req, res) => {
 
  const token = JSON.parse(JSON.stringify(req.cookies)).jwt;
  const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
      expiresIn: maxAge,
    });
  };
  const sendCookie = async (res, token) => {
    await res.cookie("jwt", token, { httpOnly: true, maxAge });
  };
  const sendData = async (res, userId) => {
    await res.status(200).json({ user: userId });
  };
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    sendCookie(res, token);
    sendData(res, user._id);
    // res.cookie('jwt', token, { httpOnly: true, maxAge});
    // res.status(200).json({ user: user._id}
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(201).json({ errors });
    console.log("Error occured");
  }
});

//-------------------------------------------------____________________-----------------------------

// user data
route.get("/:id", async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
  const token = JSON.parse(JSON.stringify(req.cookies)).jwt;
  try {
    const user = await UserModel.findById(req.params.id).select("-password");
    console.log(user);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
});


route.put("/:id", async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
  try {
    const bioUpdate = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.send(bioUpdate);
  } catch (error) {
    return res.status(500).send({ message: error });
  }

});

route.patch("/follow/:id", async (req, res) => {
   if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  const follower = async (res, idFollowing, idFollower) => {
    try {
      const data = await UserModel.findByIdAndUpdate(
        idFollower,
        { $addToSet: { following: idFollowing } },
        { new: true, upsert: true }
      );
/*       console.log(data)
 */      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  };

  const following = async (res , idFollowing, idFollower) => {
    try {
      const data = await UserModel.findByIdAndUpdate(
        idFollowing,
        { $addToSet: { followers: idFollower } },
        { new: true, upsert: true }
      );
/*        console.log(data)
 */    } catch (error) {
      return res.status(400).json({ message: error });
    }
  };
  const data = req.body;
  console.log( req.body.followerId)
  const reqBody = data
  console.log(req.params.id + ' params')
  try {
    // add to the follower list
    following(res, req.params.id ,  req.body.followerId);
    // add to following list    
    follower(res, req.params.id, req.body.followerId);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

route.patch("/unfollow/:id", async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

        const unfollow  =  async (res , idFollowing , idToUnFollow ) => {
           try {
           const data =  await UserModel.findByIdAndUpdate(
                idToUnFollow,
              { $pull: { following: idFollowing } },
              { new: true, upsert: true })
              console.log(data + ' unfollow');
           } catch (error) {
            return res.status(400).json(error)
           }
         
        }

   const following = async (res , idFollowing , idToUnFollow  ) =>{
  try {
    const data = await UserModel.findByIdAndUpdate(
      idFollowing,
      { $pull: { followers: idToUnFollow } },
      { new: true, upsert: true })
      console.log(data + ' follow');
      return res.status(200).json(data)
  }catch (error){
    return res.status(400).json(error)
  }
  }

  console.log(req.body.followerId + ' body id' )
  console.log(req.params.id + ' params id')

 
   following(res ,req.params.id , req.body.followerId)
   unfollow(res ,req.params.id , req.body.followerId)

});


// permet to log out 
 route.get("/value/logout" , (req,res)=>{
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
  console.log('page de deconnection');
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/api/user/');
})

route.delete('/:id' , async (req,res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
})


// permet to upload picture
route.post("/upload", upload.single("file"), fileData);

export default route;
