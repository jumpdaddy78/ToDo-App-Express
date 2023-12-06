var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "todo_user",
    password: "ToDoList2023!",
    database: "todo_app"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("connected!");
    let sql = "SELECT * FROM todos";
    con.query(sql, function(err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    con.end();
});
