const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');

router.post("/signup",async (req, res) => {
    const { username, email, password } = req.body;
    try {
       const existingUser = await User.findOne({ email });
        if(existingUser) 
            return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
     }
    });

    // Login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body; 
       try {
         const { email, password } = req.body;

         // find user
         const user = await User.findOne({ email });
         if (!user) {
           return res.status(400).json({ message: "Invalid credentials" });
         }

         // compare password
         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
           return res.status(400).json({ message: "Invalid credentials" });
         }

         // agar sahi hai
         return res.status(200).json({
           message: "Login successful",
           user: { id: user._id, email: user.email },
         });
       } catch (err) {
         console.error(err);
         res.status(500).json({ message: "Server error" });
       }
});


module.exports = router;