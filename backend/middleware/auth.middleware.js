import { verify } from "jsonwebtoken";
import UserModel from "../models/user.Model.js";
import express from "express";
const app = express();

export  function checkUser(req, res, next) {
const token = JSON.parse(JSON.stringify(req.cookies)).jwt ;
  if (token) {
    verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        app.locals.user = null;
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        app.locals.user = user;
        next();
      }
    });
  } else {
    app.locals.user = null;
    next();
  }
} 

export  function requireAuth(req, res, next) {
  if(app.locals.user != null){
    res.status(200).send(app.locals.user._id); 
  }
}

