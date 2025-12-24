const express = require('express'); 
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

//Handle Form Submission
app.post('/submit', (req, res)=>{
    const{
        name, phone, email, dob, country, state, gender, account_id
    } = req.body;

//Redact Account ID (Show only last 4 digits
const redactedAccountId = account_id.slice(-4).padStart(account_id.urlength, '*');

const sql = `
INSERT INTO users
(name, phone, emaul, dob, country, state, gender, account_id)
VALUES(?, ?, ?, ?, ?, ?, ?, ?)
`;

db.query(sql, [
    name, phone, email, dob, country, state, gender, redactedAccountId
],(err) => {
    if (err) throw err;
    res.send("Form submitted successfully!");
});
});

app.listen(3000, () => {
    console.log("Server running on port 3000")
});