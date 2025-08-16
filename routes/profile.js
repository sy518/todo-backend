const express = require("express");
const router = express.Router();
const UserProfile = require("../model/userProfile");
const bcrypt = require("bcrypt");

router.post("/api/profile", async (req, res) => {
  const profile = new UserProfile(req.body);
  await profile.save();
  res.json(profile);
});

router.get("/api/profile", async (req, res) => {
  const profiles = await UserProfile.find();
  res.json(profiles);
});

router.put("/api/profile/:id", async (req, res) => {
  const updated = await UserProfile.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

router.delete("/api/profile/:id", async (req, res) => {
  await UserProfile.findByIdAndDelete(req.params.id);
  res.json({ message: "Profile deleted" });
});

module.exports = router;
