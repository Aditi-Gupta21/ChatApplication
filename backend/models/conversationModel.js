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

  unreadCounts:[
    {
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      },
      count:{
        type:Number,
        default:0
      }
    }
  ]

},{timestamps:true});

export const Conversation = mongoose.model("Conversation", conversationModel);