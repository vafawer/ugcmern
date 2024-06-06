const express = require("express");
const router = express.Router();
const preferencesControllers = require("../controllers/preferencesControllers");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get('/', preferencesControllers.getAllPreferences);
router.patch(
  "/",
  authMiddleware,
  upload,
  preferencesControllers.setPreferences
);

module.exports = router;