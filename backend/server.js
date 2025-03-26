const express = require("express");
const cors = require("cors");
const { body, check, validationResult } = require("express-validator");
const comments = require("./models/model");
const compression = require("compression");

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(compression());

require("./utils/db");

// Endpoint untuk mendapatkan semua komentar
app.get("/getComments", async (req, res) => {
    try {
        const allComments = await comments.find({}, "nama email message"); // Hanya ambil field yang diperlukan
        res.json(allComments);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Endpoint untuk menambah komentar dengan validasi
app.post("/contact", [
    check("email", "Email tidak valid").isEmail(),
    check("message", "Message tidak valid").isString(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { nama, email, message } = req.body;
        const newComment = new comments({
            nama,
            email,
            message
        });

        await newComment.save();
        res.status(201).json({ message: "Komentar berhasil ditambahkan!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log("Server berjalan di port " + port);
});
