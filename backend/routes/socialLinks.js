const express = require('express');
const router = express.Router();
const { getAllSocialLinks, addSocialLink, deleteSocialLink, editSocialLink, getSocialLink, getUserSocialLinks } = require('../controllers/socialLinksControllers');
const upload = require('../middleware/uploadMiddleware'); // This middleware is for handling file uploads
const authMiddleware = require('../middleware/authMiddleware'); // Middleware for authentication

// Route to get all social links
router.get('/', getAllSocialLinks);

// Route to get a single social link by its ID, for public view doesn't require authentication
router.get('/:id', getSocialLink);

//User`s Social Links
router.get('/user/:id', getUserSocialLinks);

// Route to add a new social link, requires authentication and file upload for picture
router.post('/', authMiddleware, upload, addSocialLink);

// Route to delete a social link, requires authentication
router.delete('/:id', authMiddleware, deleteSocialLink);

// Route to edit an existing social link, requires authentication and allows file upload for updating the picture
router.patch('/:id', authMiddleware, upload, editSocialLink);

// Export the router for use in other parts of the application
module.exports = router;
