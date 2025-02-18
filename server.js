const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const professorRoutes = require('./routes/professorRoutes');
const studentRoutes = require('./routes/studentRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/professors', professorRoutes);
app.use('/api/students', studentRoutes);

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});