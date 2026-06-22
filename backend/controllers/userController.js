import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req , res) =>{
  try {
    const {fullName,userName, password, confirmPassword, gender} = req.body;

    if(!fullName || !userName || !password || !confirmPassword || !gender){
      return res.status(400).json({message: "All fields are requied"});
    }

    if(password != confirmPassword){
      return res.status(400).json({message : "Password not match"});
    }

    const user = await User.findOne({userName});

    if(user){
      return res.status(400).json({message:"Username already exit try different username "});
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const maleAvatar = `https://avatarapi.runflare.run/public/boy?username=${userName}`;
    const femaleAvatar = `https://avatarapi.runflare.run/public/girl?username=${userName}`;

    await User.create({
      fullName, userName, gender,
      password : hashedPassword,
      profilePhoto: gender==="male"?maleAvatar:femaleAvatar
    })

    return res.status(201).json({
      message: "User registered successfully",
      success:true
    });

  } catch (error) {
    res.status(500).json({message : "User not create",error: error.message})
  }
}


export const login = async(req,res)=>{
  try {
    const {userName,password}= req.body;

    if(!userName || !password){
      return res.status(400).json({message: "UserName and password is required",
        success:false
      });
    }

    const user = await User.findOne({userName});

    if(!user){
      return res.status(400).json({message: "Incorrect userName or password",
        success:false
      });
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password);

    if(!isPasswordMatch){
      return res.status(400).json({message: "Incorrrect Password or Username"});
    }

    const tokenData ={ userId: user._id }
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY , {expiresIn:'1d'});

    return res.status(200).cookie("token",token, {maxAge:1*24*60*60*1000, httpOnly:true, sameSite:'strict'}).json({
      _id:user._id,
      userName:user.userName,
      fullName:user.fullName,
      profilePhoto:user.profilePhoto
    });

  } catch (error) {
    return res.status(500).json({
      message:error.message
    })
  }
}

export const logout = (req,res)=>{
  try {
    return res.status(200).cookie("token", "", {maxAge:0}).json({
      message:"Logged out successfully"
    });
  } catch (error) {
    return res.status(500).json({
      message:error.message
    })
  }
}


export const getOtherUser = async(req,res)=>{
  try {
    const loggedInUserId = req.id;
    const otherUser = await User.find({
      _id:{$ne : loggedInUserId}
    }).select("-password");

    return res.status(200).json(otherUser);
    
  } catch (error) {
    return res.status(400).json({
      message:error.message
    })
  }
}