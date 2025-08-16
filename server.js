const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task'); // Assuming you have a task route

dotenv.config();

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("public"));
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