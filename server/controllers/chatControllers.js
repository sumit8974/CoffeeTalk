const chatModel = require("../models/chatModel");

const createChat = async (req, res) => {
  const newChat = new chatModel({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const result = await newChat.save();
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Cannot create Chat...", success: false });
  }
};

const userChats = async (req, res) => {
  try {
    const chat = await chatModel.find({
      members: { $in: [req.params.userId] },
    });
    return res.status(200).json(chat);
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Error could not get user chats...", success: false });
  }
};

const findChat = async (req, res) => {
  try {
    const chat = await chatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    return res.status(200).json(chat);
  } catch (error) {
    return res.status(400).json({ msg: "Cannot find chat...", success: false });
  }
};

module.exports = { createChat, userChats, findChat };
