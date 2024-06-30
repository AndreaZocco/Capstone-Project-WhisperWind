const express = require('express');
const path = require('path');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const mongoUtil = require('./config/db');
const app = express();

const allowedOrigins = [
  'https://capstone-project-whisper-wind.vercel.app'
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

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5000;

mongoUtil.connectToServer((err) => {
  if (err) {
    console.error(err);
    process.exit();
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
