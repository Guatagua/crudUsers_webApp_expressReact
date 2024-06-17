const express = require ("express");
const mysql = require ('mysql');
const cors = require ('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
})

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM tblusers";
    db.query(sql, (err, data) => {
        if(err) { return res.json("Error");}
        return res.json(data);
    })
}) 

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM tblusers WHERE `email` = ? AND `pwd` = ?";
    db.query(sql, [req.body.email,req.body.password], (err, data) =>{
         if(err) {
            return res.json("Error");
         }
         if(data.length > 0) {
            return res.json("Success");
         } else {
            return res.json("Failed");
         }
    })
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO tblusers (`name`,`email`,`pwd`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) =>{
         if(err) {
            return res.json("Error");
         }
         return res.json(data);
    })
})

app.post('/create', (req, res) => {
    const sql = "INSERT INTO tblusers (`name`,`email`,`pwd`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) =>{
         if(err) {
            return res.json("Error");
         }
         return res.json(data);
    })
})

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE tblusers SET `name` = ?, `email` = ?, `pwd` = ? WHERE `id_user` = ?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) =>{
         if(err) {
            return res.json("Error");
         }
         return res.json(data);
    })
})

app.delete('/users/:id', (req, res) => {
    const sql = "DELETE FROM tblusers WHERE `id_user` = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) =>{
         if(err) {
            return res.json("Error");
         }
         return res.json(data);
    })
})

app.listen(8081, () => {
    console.log("Listening on port 8081");
})
