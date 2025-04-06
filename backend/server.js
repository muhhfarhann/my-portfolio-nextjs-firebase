const express = require("express");
const cors = require("cors");
const app = express(); // <-- bikin dulu app

const bodyparser = require("body-parser");
const { check, validationResult } = require("express-validator");

// baru require file lain
require("./utils/db"); // <-- hanya koneksi DB, jangan akses `app`
const messages = require("./models/model");

app.use(cors({
    origin: 'https://my-portfolio-frontend-lime.vercel.app', // Ganti dengan URL frontend
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type'],
}));


const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true })); // Tambahan untuk parsing form-urlencoded

app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Endpoint untuk menambah komentar dengan validasi
app.post("/api/contact", [
    check("nama").notEmpty().withMessage("Nama tidak boleh kosong"),
    check("email").isEmail().withMessage("Email tidak valid"),
    check("message").notEmpty().withMessage("Pesan tidak boleh kosong")
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { nama, email, message } = req.body;

        // Cek apakah nama sudah ada di database
        const existingComment = await messages.findOne({ nama });
        if (existingComment) {
            return res.status(400).json({ error: "Nama sudah digunakan, silakan pakai nama lain." });
        }

        const newComment = new messages({ nama, email, message });

        await newComment.save();
        res.status(201).json({ message: "Success Data Send!" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Nama sudah terdaftar, gunakan nama lain." });
        }
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log("Server berjalan di port " + port);
});
