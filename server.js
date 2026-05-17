const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  try {
    if (uri) {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('MongoDB connected');
      return;
    }
    throw new Error('MONGO_URI not configured');
  } catch (err) {
    console.log('Primary MongoDB connect failed:', err.message);
    console.log('Starting in-memory MongoDB fallback');
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('In-memory MongoDB started');
  }
};

connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));
app.use('/api/lists', require('./routes/lists'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/storage', require('./routes/storage'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));