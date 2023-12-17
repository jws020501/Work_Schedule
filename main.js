
const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const getConnection = require("./back/database.js")
const mysql = require("mysql2")

app.set('views',__dirname+'/views')
app.set('view engine','ejs')
app.engine('html', require('ejs').renderFile)

let json = `{
  "a": {
    "b1": "asdasdasd",
    "b2": "1213123123123"
  }
}`

let data = JSON.parse(json)


var port = process.env.PORT||3000

app.get("/",(req,res)=>{
	getConnection((conn)=>{
	var sql = 'select * from soldiers'
        conn.query(sql, function(err, rows, fields)
        {
            if (err) {
                console.error('error connecting: ' + err.stack);
            }
            res.render('index',{'rows':rows});
                
        });
        conn.release();
    });
})


server.listen(port, () => {
  console.log('http://localhost:'+port)
})