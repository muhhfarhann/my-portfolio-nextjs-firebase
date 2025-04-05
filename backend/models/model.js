const mongoose = require('mongoose');

// Membuat schema
const messagesSchema = new mongoose.Schema({
    nama: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String },
});

// Ekspor model
const messages = mongoose.model('messages', messagesSchema);

module.exports = messages;