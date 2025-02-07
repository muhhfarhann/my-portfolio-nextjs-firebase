const mongoose = require('mongoose');

// Membuat schema
const commentsSchema = new mongoose.Schema({
    nama: String,
    email: String,
    message: String,
});

// Ekspor model
const comments = mongoose.model('comments', commentsSchema);

module.exports = comments;