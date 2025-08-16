const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  projects: [{ title: String, description: String, link: String }],
  github: { type: String, required: true },
});
module.exports = mongoose.model("UserProfile", userProfileSchema);
