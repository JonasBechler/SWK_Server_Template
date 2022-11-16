
const path = require('path');
const express = require("express");
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');


const config = require('../../../config.json')

const frontend_dir = path.join(__dirname, "..", "..", "react", "build")

var app = express(); 

// to allow cors?
// lets us make cross-origin requests without annoying errors telling us we’re not allowed to
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure sessions
app.use(session(
  {
    secret: '1234567890',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: 'auto',
      httpOnly: true,
      maxAge: 3600000
    }
  })
);

app.use((req, res, next) => {
  
  console.log(req.originalUrl);
  next();
  
});

// app.use(express.static(frontend_dir));
// app.use(express.static("public"));

app.use('/api/user', require('./routes/user'));
app.use('/api/login', require('./routes/login'));
app.use('/api/register', require('./routes/register'));
app.use('/api/logout', require('./routes/logout'));
app.use('/api/login_kn', require('./routes/login_fusionauth'));
app.use('/oauth_callback', require('./routes/callback_fusionauth'));




app.use('/', (req, res, next) => {
  // res.sendFile(path.join(frontend_dir, "index.html"));
  return
})

app.listen(config.handyticket_port);
console.log(`Handyticket server started on port ${config.handyticket_port}`);




