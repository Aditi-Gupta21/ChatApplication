import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from '../socket/socket.js'

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
        unreadCounts: [
          {
            user: senderId,
            count: 0,
          },
          {
            user: receiverId,
            count: 0,
          }
        ]
      })
    };

    const newMessage = await Message.create({
      senderId, receiverId, message
    });

    if (newMessage) {
      gotConversation.message.push(newMessage._id);
      gotConversation.lastMessage = newMessage.message;
      gotConversation.lastMessageTime = newMessage.createdAt;

      const receiverUnread = gotConversation.unreadCounts?.find(
        unread => unread.user.toString() === receiverId
      );

      if (receiverUnread) {
        receiverUnread.count += 1;
      }
    }
    await Promise.all([gotConversation.save(), newMessage.save()])


    //SOCKET IO
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }


    return res.status(200).json({
      newMessage
    });

  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}

export const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      return res.status(200).json([]);
    }

    await conversation.populate("message");

    const visibleMessages = conversation.message.filter(
      (msg) =>
        !msg.deletedFor.some(
          (user) => user.toString() === senderId.toString()
        )
    );

    return res.status(200).json(visibleMessages);

  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}

export const editMessage = async (req, res) => {
  try {
    const userId = req.id;
    const messageId = req.params.messageId;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    const existingMessage = await Message.findById(messageId);

    if (!existingMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    if (existingMessage.senderId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own messages",
      });
    }

    const fiveMin = 5 * 60 * 1000;
    if (Date.now() - existingMessage.createdAt.getTime() > fiveMin) {
      return res.status(403).json({
        success: false,
        message: "Message can only be edited within 5 minutes",
      });
    }

    existingMessage.message = message.trim();
    existingMessage.edited = true;

    await existingMessage.save();

    const receiverSocketId = getReceiverSocketId(
      existingMessage.receiverId.toString()
    );

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("messageEdited", {
        updatedMessage: existingMessage,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message updated successfully",
      updatedMessage: existingMessage,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const deleteMessage = async (req, res) => {
  try {
    const userId = req.id;
    const messageId = req.params.messageId;

    const existingMessage = await Message.findById(messageId);

    if (!existingMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    if (existingMessage.senderId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own messages",
      });
    }

    existingMessage.deleted = true;
    existingMessage.deletedForEveryone = true;
    existingMessage.message = "This message was deleted";
    existingMessage.edited = false;

    await existingMessage.save();

    const receiverSocketId = getReceiverSocketId(
      existingMessage.receiverId.toString()
    );

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("messageDeleted", {
        deletedMessage: existingMessage,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
      deletedMessage: existingMessage,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMessageForMe = async (req, res) => {
  try {
    const userId = req.id;
    const messageId = req.params.messageId;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    if (!message.deletedFor.includes(userId)) {
      message.deletedFor.push(userId);
      await message.save();
    }

    return res.status(200).json({
      success: true,
      message: "Message deleted for you",
      messageId,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forwardMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const { receiverIds, message } = req.body;

    if (!receiverIds?.length || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Receiver and message are required",
      });
    }

    for (const receiverId of receiverIds) {

      // Find conversation
      let gotConversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      // Create conversation if not exists
      if (!gotConversation) {
        gotConversation = await Conversation.create({
          participants: [senderId, receiverId],
          unreadCounts: [
            {
              user: senderId,
              count: 0,
            },
            {
              user: receiverId,
              count: 0,
            },
          ],
        });
      }

      // Create forwarded message
      const newMessage = await Message.create({
        senderId,
        receiverId,
        message,
        forwarded:true,
      });

      gotConversation.message.push(newMessage._id);
      gotConversation.lastMessage = newMessage.message;
      gotConversation.lastMessageTime = newMessage.createdAt;

      const receiverUnread = gotConversation.unreadCounts.find(
        (unread) => unread.user.toString() === receiverId.toString()
      );

      if (receiverUnread) {
        receiverUnread.count += 1;
      }

      await Promise.all([
        gotConversation.save(),
        newMessage.save(),
      ]);

      // Socket
      const receiverSocketId = getReceiverSocketId(
        receiverId.toString()
      );

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Message forwarded successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};