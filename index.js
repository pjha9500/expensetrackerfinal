


const express=require('express');
const app=express();
const bodyparser=require('body-parser');
var cors = require('cors');
var bcrypt = require('bcryptjs');

app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
const mysql=require('mysql2');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database:'expensetracker',
    password: "Pjha@11810995"
  })
app.get('/register',(req,res,next)=>{
    res.send("hello");
})
app.post('/register',async (req,res,next)=>{
    console.log(req.body);
    let hash=await bcrypt.hash(req.body.password,10);
    console.log(hash);
    con.connect(function(err){
        if (err) throw err;
        console.log("Connected!");
        // let hash=bcrypt.hash(req.body.password,10);
        var sql = `INSERT INTO userinfo (email, name, contact ,password ) VALUES ('${req.body.email}', '${req.body.name}','${req.body.number}','${hash}')`;
        con.query(sql, function (err, result) {
            if (err) {console.log('useralready present');
                        res.status(500).send();}
            else{
                console.log("1 record inserted");
                res.status(200).send();
            }
            
            });
    })

    
})
app.post('/login',(req,res,next)=>{
    console.log(req.body);
    res.status(200).send();
})

app.listen(3000);



// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = `INSERT INTO user (email, name ) VALUES ('${req.body.email}', '${req.body.name}')`;
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("1 record inserted");
//     });
//   });
// res.status(200);
// res.redirect('/booking');~