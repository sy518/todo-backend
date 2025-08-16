const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile"); 

dotenv.config();

const app = express();
const port = 5000;

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // ✅ dono origins allow
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes); 

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)

  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
 console.log("MongoDB URI:", process.env.MONGODB_URI);
 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});