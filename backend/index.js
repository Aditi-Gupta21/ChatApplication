import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoutes.js";
import cors from 'cors'

dotenv.config({});
connectDB();

const app = express();
const PORT = process.env.PORT || 8000

//middleWare
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsOption={
  origin:'http://localhost:5173',
  credentials:true
};
app.use(cors(corsOption));



// routes 
app.use("/api/v1/user", userRoute);
//http://localhost/8000/api/v1/user/register
app.use("/api/v1/message", messageRoute);

app.listen(PORT, ()=>{
  console.log(`Sever listen at port ${PORT}`);
})