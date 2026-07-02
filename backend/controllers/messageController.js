import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import {getReceiverSocketId, io} from '../socket/socket.js'

export const sendMessage = async(req, res)=>{
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const {message} = req.body;

    let gotConversation = await Conversation.findOne({
      participants:{$all : [senderId, receiverId]}
    });

    if(!gotConversation){
      gotConversation = await Conversation.create({
        participants:[senderId, receiverId],
        unreadCounts:[
          {
            user:senderId,
            count:0,
          },
          {
            user:receiverId,
            count:0,
          }
        ]
      })
    };

    const newMessage = await Message.create({
      senderId, receiverId, message
    });

    if(newMessage){
      gotConversation.message.push(newMessage._id);
      gotConversation.lastMessage = newMessage.message;
      gotConversation.lastMessageTime = newMessage.createdAt;
    }
    await Promise.all([gotConversation.save(), newMessage.save()])


    //SOCKET IO
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }    
    
    
    return res.status(200).json({
      newMessage
    });

  } catch (error) {
    return res.status(401).json({message : error.message});
  }
}


export const getMessage = async(req,res)=>{
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const conversation = await Conversation.findOne({
      participants:{$all: [senderId, receiverId]}
    }).populate("message");
    

    return res.status(200).json(conversation?.message);
    
  } catch (error) {
    return res.status(401).json({message : error.message});
  }
}