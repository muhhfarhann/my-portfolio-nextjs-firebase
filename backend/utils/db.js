const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/my_portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Koneksi MongoDB gagal:'));
db.once('open', () => {
    console.log('Koneksi MongoDB berhasil');
});

module.exports = db;