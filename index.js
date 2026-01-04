//import frameworks and libraries
const express = require('express');
const path = require('path');
const initDb = require('./db');

const app = express();
let db;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize DB BEFORE starting server
(async () => {
  try {
    db = await initDb();

    app.listen(8080, () => {
      console.log("Server running on port 8080");
    });
  } catch (err) {
    console.error("Failed to start app:", err);
    process.exit(1);
  }
})();

// Handle Form Submission
app.post('/submit', async (req, res) => {
  try {
    const { name, phone, email, dob } = req.body;

    if (!name || !phone || !email || !dob) {
      return res.status(400).send("All fields are required");
    }

    const sql = `
      INSERT INTO users (name, phone, email, dob)
      VALUES (?, ?, ?, ?)
    `;

    await db.execute(sql, [name, phone, email, dob]);

    res.send("Form Submitted Successfully!");
  } catch (err) {
    console.error("Insert Failed:", err);
    res.status(500).send("Internal Server Error");
  }
});