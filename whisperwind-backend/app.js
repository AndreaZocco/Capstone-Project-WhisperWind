const express = require('express');
const path = require('path');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const app = express();

const corsOptions = {
  origin: 'https://capstone-project-whisper-wind.vercel.app',
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const db = require('./config/db');
db.getConnection()
  .then(() => {
    console.log('Connected to database.');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err.stack);
  });
