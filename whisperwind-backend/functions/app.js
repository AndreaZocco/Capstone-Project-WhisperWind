const express = require('express');
const path = require('path');
const cors = require('cors');
const userRoutes = require('./userRoutes');
const serverless = require('serverless-http');

const app = express();

const allowedOrigins = [
  'https://whisperwind1.netlify.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/users', userRoutes);

module.exports.handler = serverless(app);
