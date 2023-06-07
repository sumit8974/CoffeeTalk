const router = require("express").Router();
const {
  registerUser,
  authUser,
  getUserDetails,
  getAllUserDetails,
} = require("../controllers/userControlles");

router.route("/register").post(registerUser);
router.post("/login", authUser);
router.get("/get-allusers", getAllUserDetails);
router.post("/get-user", getUserDetails);

module.exports = router;
