const express = require("express");
const router = express.Router();
const Card = require("../models/Card");
const User = require("../models/User");
const SocialLink = require("../models/SocialLink");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const slugify = require("slugify");
const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const userLayout = "../views/layouts/user";
const mainLayout = "../views/layouts/main";
const productLayout = "../views/layouts/product";

const jwtSecret = process.env.JWT_SECRET;

const mainRoutes = require("./main");
const authMiddleware = require("../middleware/authMiddleware");