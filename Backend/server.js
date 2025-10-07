const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');


// Connect to MongoDB
connectDB();






app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// ✅ Register admin routes here


// Schema
const QuoteSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

// Model
const Quote = mongoose.model("Quote", QuoteSchema);

// Routes
app.post("/api/quote", async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        const newQuote = new Quote({ name, email, phone, message });
        await newQuote.save();
        res.status(201).json({ success: true, message: "Quote saved successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});



// ✅ Start server
const PORT = process.env.PORT;

app.listen(PORT,  () => console.log(`🚀 Server running on port ${PORT}`));
