/*


const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/students', authRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/attendance', attendanceRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
}).catch(err => console.error('MongoDB connection error:', err));


*/

// app.js

{
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import route modules
const authRoutes = require('./routes/authRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', authRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/attendance', attendanceRoutes);

// Health check / test MongoDB connection
app.get('/api/test-db', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.status(200).json({
      success: true,
      message: 'Connected to MongoDB Atlas!',
      collections: collections.map(c => c.name),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message,
    });
  }
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(' MongoDB Atlas connected');

  const PORT = process.env.PORT || 3030;
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });

}).catch((err) => {
  console.error(' MongoDB connection error:', err);
});
}



/*
// app2.js
{
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');

// Import route modules
const authRoutes = require('./routes/authRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Decrypt MongoDB URI function
function decryptMongoURI(encryptedUri, ivHex) {
  const encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // Convert hex to Buffer (32 bytes)
  const iv = Buffer.from(ivHex, 'hex'); // Convert the IV from hex to a buffer
  const algorithm = 'aes-256-cbc';

  const decipher = crypto.createDecipheriv(algorithm, encryptionKey, iv);
  let decrypted = decipher.update(encryptedUri, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

// Get the encrypted MongoDB URI and IV from the environment variables
const encryptedMongoURI = process.env.MONGO_URI_ENCRYPTED;  // The encrypted URI
const ivHex = process.env.MONGO_URI_IV;  // The IV (Initialization Vector)

// Decrypt the URI before using it to connect to MongoDB
const mongoURI = decryptMongoURI(encryptedMongoURI, ivHex);

// Routes
app.use('/api/students', authRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/attendance', attendanceRoutes);

// Health check / test MongoDB connection
app.get('/api/test-db', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.status(200).json({
      success: true,
      message: 'Connected to MongoDB Atlas!',
      collections: collections.map(c => c.name),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message,
    });
  }
});

// Connect to MongoDB and start the server
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB Atlas connected');

  const PORT = process.env.PORT || 3030;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

}).catch((err) => {
  console.error('MongoDB connection error:', err);
});
}*/