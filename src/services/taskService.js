const { randomUUID } = require("crypto");

// "Database" sementara — data disimpan di array (hilang kalau server restart)
const tasks = [];

// Ambil semua task
exports.list = () => tasks;

// Cari task berdasarkan ID
exports.findById = (id) => tasks.find((t) => t.id === id);

// Buat task baru, lalu taruh di posisi paling atas array (unshift)
exports.create = ({ title }) => {
 // [LANGKAH 6C] Server memproses data: Bikin objeknya dan simpan ke database (di sini pakai array)
 const task = { id: randomUUID(), title, done: false, createdAt: Date.now() };
 tasks.unshift(task); // <-- simpan ke penyimpanan
 return task; // lempar balik datanya ke Controller
};

// Update task → cari dulu, kalau tidak ada return null
// Kalau ada, update field yang dikirim saja (partial update)
exports.update = (id, payload) => {
 const task = tasks.find((item) => item.id === id);
 if (!task) return null;

 if (payload.title !== undefined) {
  task.title = payload.title;
 }

 if (payload.done !== undefined) {
  task.done = payload.done;
 }

 return task;
};

// Hapus task → cari index-nya, kalau tidak ada return null
exports.remove = (id) => {
 const index = tasks.findIndex((item) => item.id === id);
 if (index === -1) return null;
 return tasks.splice(index, 1)[0]; // hapus dari array, return task yang dihapus
};
