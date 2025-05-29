const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv=require('dotenv')
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err);
});

// Create schema and model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});
const Contact = mongoose.model('contacts', contactSchema);

// POST route to save contact
app.post('/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(200).send('Contact saved');
  } catch (error) {
    res.status(500).send('Error saving contact');
  }
});

// GET all contacts
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).send('Error fetching contacts');
  }
});

// UPDATE contact
app.put('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!contact){
        return res.status(404).send('contact not found');
    }
    res.json(contact);
  } catch (err) {
    res.status(400).send('Error updating contact');
  }
});

// DELETE contact
app.delete('/contacts/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.send('Contact deleted');
  } catch (err) {
    res.status(400).send('Error deleting contact');
  }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
