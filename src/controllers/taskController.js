const taskService = require("../services/taskService");
const { AppError } = require("../utils/AppError");

// GET /api/tasks → Ambil semua task
exports.list = (req, res, next) => {
    try {
        const tasks = taskService.list();
        res.json({ data: tasks });
    } catch (err) {
        next(err);
    }
};

// GET /api/tasks/:id → Ambil 1 task berdasarkan ID
exports.detail = (req, res, next) => {
    try {
        const task = taskService.findById(req.params.id);
        if (!task) throw new AppError(404, "Task tidak ditemukan");
        res.json({ data: task });
    } catch (err) {
        next(err); // lempar error ke errorHandler middleware
    }
};

// POST /api/tasks → Buat task baru
exports.create = (req, res, next) => {
    try {
        // [LANGKAH 6A] Server memproses data: Bagian validasi (cek data kosong/kepanjangan)
        const title = String(req.body.title || "").trim();
        if (!title) throw new AppError(400, "title wajib diisi");
        if (title.length > 120) throw new AppError(400, "title maksimal 120 karakter");

        // [LANGKAH 6B] Server menyuruh Service memproses penyimpanan datanya
        const task = taskService.create({ title });

        // [LANGKAH 7] Server kirim balasan (response) balik ke Postman
        res.status(201).json({ message: "Task dibuat", data: task });
    } catch (err) {
        next(err);
    }
};

// PATCH /api/tasks/:id → Update sebagian data task
exports.update = (req, res, next) => {
    try {
        const payload = {};

        if (req.body.title !== undefined) {
            const title = String(req.body.title).trim();
            if (!title) throw new AppError(400, "title wajib diisi");
            if (title.length > 120) throw new AppError(400, "title maksimal 120 karakter");
            payload.title = title;
        }

        if (req.body.done !== undefined) {
            if (typeof req.body.done !== "boolean") {
                throw new AppError(400, "done harus boolean");
            }
            payload.done = req.body.done;
        }

        if (Object.keys(payload).length === 0) {
            throw new AppError(400, "Tidak ada data yang diupdate");
        }

        const task = taskService.update(req.params.id, payload);
        if (!task) throw new AppError(404, "Task tidak ditemukan");

        res.json({ message: "Task diupdate", data: task });
    } catch (err) {
        next(err);
    }
};

// DELETE /api/tasks/:id → Hapus task
exports.remove = (req, res, next) => {
    try {
        const task = taskService.remove(req.params.id);
        if (!task) throw new AppError(404, "Task tidak ditemukan");

        res.json({ message: "Task dihapus", data: task });
    } catch (err) {
        next(err);
    }
};
