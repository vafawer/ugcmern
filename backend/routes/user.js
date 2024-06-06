const express = require("express");
const router = express.Router();
const userController = require('../controllers/userControllers');
const authMiddleware = require("../middleware/authMiddleware");

//router.get("/login", userController.loginPage); // If you have a separate method for rendering the page
router.get("/verify", authMiddleware, userController.getMe);
router.get("/:username", userController.getUser);
router.post("/login", userController.login);
//router.get("/register", userController.registerPage); // If you have a separate method for rendering the page
router.post("/register", userController.register);
router.post("/update-profile", authMiddleware, userController.updateProfile);
router.post("/change-password", authMiddleware, userController.changePassword);
router.delete("/delete-account", authMiddleware, userController.deleteAccount);

module.exports = router;
