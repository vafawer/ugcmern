require('dotenv').config();

const path = require("path");
app.use(express.static(path.join(__dirname, "build")));

const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');

const connectDB = require('./config/db');

const app = express();
const PORT = 3001 || process.env.PORT;

// Connect to DB
connectDB();

// app.use((req, res, next) => {
//     res.set('Cache-Control', 'no-store');
//     next();
// });

//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
//Templating Engine
app.use('/api/cards', require('./routes/cards'));
app.use('/api/socialLinks', require('./routes/socialLinks'));
app.use('/api/preferences', require('./routes/preferences'));
app.use('/user', require('./routes/user'));





app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`);
});