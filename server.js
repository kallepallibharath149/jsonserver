const express = require('express'); 
//const crypto = require('crypto');
var nodemailer = require('nodemailer');
const app = express(); 
var mysql = require('mysql');
const port = process.env.YOUR_PORT || process.env.PORT || 5000;
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "us-cdbr-iron-east-05.cleardb.net",
  user: "b0cf765cc1f1be",
  password: "c6e5c9ce",
  database: "heroku_44d6ee1f0746480"
});
function doSome(res){
  con.connect(function(err) {
    if (err) throw err;
    let headers='';
    con.query("SELECT * FROM Persons", function (err, result, fields) {
      if (err) throw err;
      let keys=Object.keys(result[0]);
      keys.forEach(header=>{
        headers=headers+''+header;
      })
      res.send(headers);
    });
  });
}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'raju221156@gmail.com',
      pass: 'Bharath@123'
    }
  });
  var mailOptions = {
    from: 'raju221156@gmail.com',
    to: 'raju221156@gmail.com',
    subject: 'Some One trying to login OEC Application',
    text: 'entered text'
  };
app.listen(port, function (err) { 
	if(err){ 
		console.log("error while starting server"); 
	} 
	else{ 
		console.log("server has been started at "+port); 
	} 
}) 

app.get('/', function (req, res) { 
     //var gfg = encrypt('bharath');
//console.log(gfg);
//console.log(decrypt(gfg));
//res.send('we are at the root route of our server'); 
doSome(res);
}) ;
app.get('/trying', function (req, res) { 
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
   // res.send('redirecting to name'); 
    });
    
    app.get('/name/bharath', function (req, res) {
        console.log(req); 
        res.send('bharath'); 
        });
        app.get('/na', function (req, res) {
            console.log(req); 
            res.send('bharath'); 
            });  
