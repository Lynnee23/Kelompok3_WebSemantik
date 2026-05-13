const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const taskRoutes = require("./src/routes/taskRoutes");
const { notFound } = require("./src/middlewares/notFound");
const { errorHandler } = require("./src/middlewares/errorHandler");
const app = express();


app.use(cors());
// [LANGKAH 5] Server baca isi data (body) JSON dari Postman biar jadi req.body
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// [LANGKAH 4A] Server ngecek Path: "Oh jalurnya /api/tasks, kita lempar ke taskRoutes"
app.use("/api/tasks", taskRoutes);

// 1. Tes Create Note (Method POST, Path /api/notes, Status 201)
app.post("/api/notes", (req, res) => {
    res.status(201).json({
        message: "Note berhasil dibuat",
        info: "Ini adalah cara RESTful (menggunakan POST), bukan /api/createNote"
    });
});

// 2. Tes Delete Note (Method DELETE, Path /api/notes/:id, Status 200)
app.delete("/api/notes/:id", (req, res) => {
    res.status(200).json({
        message: `Note dengan ID ${req.params.id} berhasil dihapus`,
        info: "Ini adalah cara RESTful (menggunakan DELETE), bukan /api/deleteNote"
    });
});

// HARUS PALING BAWAH
app.use(notFound);
app.use(errorHandler);

module.exports = app;