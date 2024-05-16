import path from 'path';
import { fileURLToPath } from 'url';
import UserModel from "../models/user.Model.js";
import {promisify} from 'util';
import stream from 'stream';
import fs from 'fs';
import { uploadErrors } from '../auth.error/errors.utils.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pipeline = promisify(stream.pipeline);

export const fileData = async (req , res ) =>{

  //  console.log(upload.single())
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

 const fileName = req.body.userId + ".jpg";
 await pipeline(
   req.file.stream,
   fs.createWriteStream(
     `${__dirname}/../../client/public/uploads/profil/${fileName}`
   )
 );
 try {
  const  data =  await UserModel.findByIdAndUpdate(
     req.body.userId,
     { $set : {picture: "./uploads/profil/" + fileName}},
     { new: true, upsert: true, setDefaultsOnInsert: true}
   );
   return  res.send(data);
 } catch (err) {
   return res.status(500).send({ message: err });
 }
 

}

