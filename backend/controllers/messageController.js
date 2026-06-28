import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";

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
        participants:[senderId, receiverId]
      })
    };

    const newMessage = await Message.create({
      senderId, receiverId, message
    });

    if(newMessage){
      gotConversation.message.push(newMessage._id);
    }

    await gotConversation.save();

    return res.status(200).json({
      newMessage
    });
    

    //SOCKET IO




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

    // const conMes = conversation.message;
    // conMes.forEach((m)=>{
    //   console.log(m.message);
    // })
    

    return res.status(200).json(conversation?.message);
    
  } catch (error) {
    return res.status(401).json({message : error.message});
  }
}