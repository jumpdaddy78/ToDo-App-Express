const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config()
var mysql = require('mysql');

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});


app.use(express.json());

con.connect();


app.get("/", (req, res) => {
    let sql = "SELECT * FROM todos;";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json({todos: result});
    })
});
       
app.post("/todo", (req, res) => {
    const { Todoitem } = req.body;
    let sql = "INSERT INTO todos (Todoitem) VALUES (?);";
    con.query(sql, [Todoitem]);
    res.status(200).send("OK");
    console.log("Req:", req.body);
})

app.post("/delete", (req, res) => {
    const { No } = req.body;
    let sql = "DELETE FROM todos WHERE No = ?;";
    con.query(sql, [No]);
    res.status(200).send("Objekt deleted");
})

app.post("/update", (req, res) => {
    const {No} = req.body;
    let sql = `
    UPDATE todos
    SET Status = CASE
        WHEN Status = "open" THEN "in progress"
        WHEN Status = "in progress" THEN "finished"
        ELSE Status
    END
    WHERE No = ?;`;
    con.query(sql, [No]);
    res.status(200).send("Status updated");
})

app.listen(port, () => {
    console.log(`App runs and listens on:`)
})
