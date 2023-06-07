const {
  addMessage,
  getMessages,
} = require("../controllers/messageControllers");

const router = require("express").Router();

router.post("/", addMessage);
router.get("/:chatId", getMessages);

module.exports = router;
