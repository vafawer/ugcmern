const express = require("express");
const router = express.Router();
const cardControllers = require("../controllers/cardControllers");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // Assuming you have middleware for handling file uploads

//CRUD for CARDS
router.get("/", cardControllers.getAllCards);
router.get("/:id", cardControllers.getCard);
router.get("/user/:id", cardControllers.getUserCards);
router.post("/", authMiddleware, upload, cardControllers.addCard);
router.delete("/:id", authMiddleware, cardControllers.deleteCard);
router.patch("/:id", authMiddleware, upload, cardControllers.editCard);

module.exports = router;
