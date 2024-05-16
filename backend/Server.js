import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from  'body-parser';
import route from "./routes/user.Routes.js";
import { checkUser, requireAuth } from './middleware/auth.middleware.js';
import  cookieParser from 'cookie-parser';
import routerPost from './routes/posts.Routes.js';
import postModel from "./models/post.model.js";
const app = express();
// allow to fetch .env variable
dotenv.config();
// allow to avoid  cors problem and crossing
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
} 
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(" successfully connected to mongo-db");
  })
  .catch((error) => {
    console.log(error.message);
  });
app.use(cookieParser());
app.use(cors(corsOptions));
//app.use(cors())
// convert all data from client in json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));

app.use('*',checkUser);
app.get('/jwtid', requireAuth);

app.use('/api/user' , route ) 
app.use("/api/post", routerPost)


app.listen(process.env.PORT, (req, res) =>
  console.log("server has been launched on port : " + process.env.PORT)
);