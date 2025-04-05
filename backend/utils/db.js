const mongoose = require('mongoose');
require('dotenv').config();

const urlMongodbAtlas = process.env.MONGO_URI;

mongoose.connect(urlMongodbAtlas)
    .then(() => console.log('✅ Koneksi MongoDB berhasil'))
    .catch(err => console.error('❌ Koneksi MongoDB gagal:', err));