const express = require("express");
const ctrl = require("../../controllers/user");

const auth = require("../../middlewares/auth");
const { UserJoiSchema } = require("../../models/userSchema");
const validateJoiSchema = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.get("/", ctrl.getUsers);
router.post("/signup", ctrl.signupUser);
router.post("/login", ctrl.loginUser);
router.get("/logout", auth, ctrl.logoutUser);

router.get("/current", auth, ctrl.currentUser);
router.patch("/", auth, validateJoiSchema(UserJoiSchema), ctrl.updateUser);

module.exports = router;
