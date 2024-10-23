const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables

const app = express();
app.use(express.json());  // Parse incoming JSON
app.use(cors());  // Enable CORS

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/auth', require('./routes/auth'));  // Authentication routes
app.use('/patient', require('./routes/patient'));  // Patient profile routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
