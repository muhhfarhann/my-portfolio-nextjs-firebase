const mongoose = require('mongoose');

const urlMongodbAtlas = "mongodb+srv://mfarhan:youllneverwalkalone@cluster0.iscw9.mongodb.net/my_portfolio?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(`${urlMongodbAtlas}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10 //batas maksimal koneksi agar lebih efisien
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Koneksi MongoDB gagal:'));
db.once('open', () => {
    console.log('Koneksi MongoDB berhasil');
});

module.exports = db;