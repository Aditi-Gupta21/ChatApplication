import {Conversation} from '../models/conversationModel.js';
import {Message} from '../models/messageModel.js'

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
      const unread = conversation.unreadCounts.find(
        (item)=> item.user.toString() === loggedInUserId.toString()
      )

      return {
        _id : conversation._id,
        user:otherUser,
        lastMessage: conversation.lastMessage,
        lastMessageTime : conversation.lastMessageTime,
        unreadCount:unread? unread.count:0,
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


export const markConversationAsRead = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    const otherUserId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [loggedInUserId, otherUserId] },
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    await Message.updateMany(
      {
        senderId: otherUserId,
        receiverId: loggedInUserId,
        seen: false,
      },
      {
        $set: {
          seen: true,
        },
      }
    );

    const unread = conversation.unreadCounts.find(
      (item) => item.user.toString() === loggedInUserId.toString()
    );

    if (unread) {
      unread.count = 0;
    }

    await conversation.save();

    return res.status(200).json({
      success: true,
      message: "Conversation marked as read",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};