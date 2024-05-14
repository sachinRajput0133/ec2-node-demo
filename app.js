// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB:', err));
app.use(cors())
app.use(express.json())

// Define a simple schema and model
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
  name: String,
});
console.log("hii")
const ItemModel = mongoose.model('Item', ItemSchema);

// Define a sample API endpoint
app.get('/api/items', async (req, res) => {
  try {
    // Fetch items from MongoDB
    const items = await ItemModel.find();
    res.json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
