const messageModel = require("../models/messageModel");

const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new messageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Cannot add message...", success: false });
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await messageModel.find({ chatId });
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Cannot get messages...", success: false });
  }
};

module.exports = { addMessage, getMessages };
