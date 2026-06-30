import {Conversation} from '../models/conversationModel.js';

export const getSidebarConversations = async (req, res) =>{
  try {
    const loggedInUserId = req.id;
    //Find all conversation where the logged-in user is a participant
    const conversations = await Conversation.find({
      participants:loggedInUserId,
    }).populate(
      "participants", 
      "fullName userName profilePhoto"
    );
    // Format the responser for the sidebar

    const sidebarConversations = conversations.map((conversation)=>{
      const otherUser = conversation.participants.find((participant)=> 
        participant._id.toString() !== loggedInUserId.toString()
      )

      if(!otherUser) return null;

      return {
        _id : conversation._id,
        user:otherUser,
        lastMessage: conversation.lastMessage,
        lastMessageTime : conversation.lastMessageTime,
      };
    });

    return res.status(200).json({
      success:true,
      conversations:sidebarConversations,
    });

  } catch (error) {
    return res.status(500).json({
      success:false,
      message: error.message,
    })
  }
}