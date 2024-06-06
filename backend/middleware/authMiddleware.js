/**
 * 
 * Check Login
*/
const User = require('../models/User');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;


const authMiddleware = (req, res, next ) => {
  try {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  }

  const optionalAuthMiddleware = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, jwtSecret);
            req.userData = decoded; // User is logged in
        }
        // Whether or not the user is logged in, the request continues
        next();
    } catch (error) {
        // If there's an error (like an expired token), we just move on without setting req.userData
        next();
    }
};

module.exports = optionalAuthMiddleware;
  module.exports = authMiddleware;