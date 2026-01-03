//import frameworks and libraries
const express = require('express'); 
//const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

//create nodejs app using express and middlewares
const app =express();
//app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


//create connection to RDS
const db = mysql.createConnection ({
host: 'database-1.cysorqkniyib.us-east-1.rds.amazonaws.com',
user: 'admin',
password: 'Qwerty123#',
database:'formdb'
});

//Connect to RDS
db.connect(err => {
    if (err) throw err;
    console.log("Connected to MYSQL RDS")
});

//Handle Form Submission
app.post('/submit', (req, res)=>{
    const{
        name, phone, email, dob
    } = req.body;

//Redact Account ID (Show only last 4 digits
//const redactedAccountId = account_id
 //   ? account_id.slice(-4).padStart(account_id.length, '*')
 //   : null;

const sql = `
INSERT INTO users
(name, phone, email, dob)
VALUES(?, ?, ?, ?)
`;

db.query(sql, [
    name, phone, email, dob
],(err) => {
    if (err) throw err;
    res.send("Form submitted successfully!");
});
});

//Run Node JS server on port 8080
app.listen(8080, () => {
    console.log("Server running on port 8080")
});