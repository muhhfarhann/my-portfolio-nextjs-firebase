const mongoose = require('mongoose');

// Membuat schema
const commentsSchema = new mongoose.Schema({
    nama: { type: String, unique: true },
    email: String,
    message: String,
});

// Ekspor model
const comments = mongoose.model('comments', commentsSchema);

module.exports = comments;