import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

// ===============================
// Sidebar Conversations
// ===============================
export const getSidebarConversations = async (req, res) => {
  try {
    const loggedInUserId = req.id;

    const conversations = await Conversation.find({
      participants: loggedInUserId,
    }).populate(
      "participants",
      "fullName userName profilePhoto"
    );

    const sidebarConversations = conversations
      .map((conversation) => {
        const otherUser = conversation.participants.find(
          (participant) =>
            participant._id.toString() !== loggedInUserId.toString()
        );

        if (!otherUser) return null;

        const unread = conversation.unreadCounts?.find(
          (item) =>
            item.user.toString() === loggedInUserId.toString()
        );

        return {
          _id: conversation._id,
          user: otherUser,
          lastMessage: conversation.lastMessage,
          lastMessageTime: conversation.lastMessageTime,
          unreadCount: unread ? unread.count : 0,
        };
      })
      .filter(Boolean);

    return res.status(200).json({
      success: true,
      conversations: sidebarConversations,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Mark Conversation As Read
// ===============================
export const markConversationAsRead = async (req, res) => {

  try {
    const loggedInUserId = req.id;
    const otherUserId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: {
        $all: [loggedInUserId, otherUserId],
      },
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    // Get unseen messages
    const unseenMessages = await Message.find(
      {
        senderId: otherUserId,
        receiverId: loggedInUserId,
        seen: false,
      },
      "_id"
    );


    // Mark them seen
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

    // Reset unread count
    const unread = conversation.unreadCounts?.find(
      (item) =>
        item.user.toString() === loggedInUserId.toString()
    );

    if (unread) {
      unread.count = 0;
    }

    await conversation.save();
    console.log(
      unseenMessages.map((msg) => msg._id)
    );

    
    // Notify sender
    const senderSocketId = getReceiverSocketId(otherUserId);

    if (senderSocketId && unseenMessages.length > 0) {
      io.to(senderSocketId).emit("messagesSeen", {
        messageIds: unseenMessages.map((msg) => msg._id),
      });
    }

    return res.status(200).json({
      success: true,
      message: "Conversation marked as read",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};