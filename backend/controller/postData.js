import path from 'path';
import { fileURLToPath } from 'url';
import postModel from "../models/post.model.js";
import {promisify} from 'util';
import stream from 'stream';
import fs from 'fs';
import { uploadErrors } from '../auth.error/errors.utils.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pipeline = promisify(stream.pipeline);

export const postData = async (req , res ) =>{

  //  console.log(upload.single())

  const nameOfFile = req.body.posterId + Date.now() + ".jpg";
  if(req.file !==null){
    try {
    
        if (
          req.file.detectedMimeType != "image/jpg" &&
          req.file.detectedMimeType != "image/png" &&
          req.file.detectedMimeType != "image/jpeg"  
        )
          throw Error("invalid file");
        if (req.file.size > 500000) throw Error("max size");
      } catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json({ errors });
      }
     
      await pipeline(
        req.file.stream,
        fs.createWriteStream(
          `${__dirname}/../../client/public/uploads/posts/${nameOfFile}`
        )
      );     
  }
 
  
  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: (req.file === undefined || req.file === null ) ? "" :  "./uploads/posts/" + nameOfFile,
    video: req.body.video,
    likers: [],
    comments: [],
  });


  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    console.log(err)
    return res.status(400).send(err);
  }
};
 

