const app = require("./app");
const PORT = process.env.PORT || 4000;

// [LANGKAH 3] Server "dengerin" request yang masuk di port 4000
app.listen(PORT, () => {
 console.log(`API running on http://localhost:${PORT}`);
});