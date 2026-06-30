import mongoose from "mongoose";

const conversationModel = new mongoose.Schema({
  participants:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }],
  message:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Message"
  }],

  lastMessage:{
    type:String,
    default: "",
  },
  lastMessageTime:{
    type:Date,
    default:null,
  },
},{timestamps:true});

export const Conversation = mongoose.model("Conversation", conversationModel);