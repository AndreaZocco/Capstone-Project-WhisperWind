
const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);

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
