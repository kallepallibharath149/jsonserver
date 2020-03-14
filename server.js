const express = require('express'); 
//const crypto = require('crypto');
var nodemailer = require('nodemailer');
const app = express(); 

var bodyParser = require('body-parser');
var mysql = require('./node_modules/mysql');
const port = process.env.YOUR_PORT || process.env.PORT || 5000;
//var mysql = require('mysql');
var cors = require('cors');
var con;
app.use(cors());
app.use(bodyParser.json());
var transporter = nodemailer.createTransport({
  host: 'smtp.mail.yahoo.com',
            port: 465,
              secure: false,
service: 'yahoo',
  auth: {
    user: 'raju.kallepalli@yahoo.com',
    pass: 'Bharath@123'
  },
debug: false,
            logger: true
});
var mailOptions = {
  from: 'raju.kallepalli@yahoo.com',
  to: 'raju221156@gmail.com',
  subject: 'Some One trying to login OEC Application',
  html: ''
};
function doSome(res ,req){
  let userObject={};
 // console.log(req);
 let web=`<h1 style="color:red">USER DETAILS WHILE LOGGING IN</h1><h2 href="http://ganainteriors.freetzi.com" style="color:green;">${req.username}</h2>`;
 mailOptions.html=web;
 mailOptions.subject="USER DETAILS WHILE LOGGING IN";
  if(req.username=='faculty' && req.password=='faculty'){
    userObject.loggedin=true;
    userObject.userName=req.username;
  } else{
    userObject.loggedin=false;
    userObject.userName=req.username;
  }
  
    let headers='';
    con.query("SELECT * FROM Persons", function (err, result, fields) {
      if (err) throw err;
      let keys=Object.keys(result[0]);
      keys.forEach(header=>{
        headers=headers+' '+header;
      })
      headers=headers+" "+"this was developped by bharath";
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      result.unshift(userObject);
      res.send(result);
      //con.destroy();
    });
 }


app.listen(port, function (err) { 
	if(err){ 
    console.log("error while starting server"); 
    if (err) throw err;
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
console.log(req.headers);
 con = mysql.createConnection({
  host: "us-cdbr-iron-east-05.cleardb.net",
  user: "b0cf765cc1f1be",
  password: "c6e5c9ce",
  database: "heroku_44d6ee1f0746480"
});

  con.connect(function(err) {
    if (err){};
    doSome(res,req.headers);
  });
  con.on('error', function() {});


}) ;
app.post('/', function (req, res) {  
   // Prepare output in JSON format  
   response = {  
       first_name:'bharath',  
       last_name:'bharath'  
   };  
   //console.log(response);  
   //res.send(JSON.stringify(response));  
})  
app.get('/trying', function (req, res) { 
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          if (err) throw err;
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
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
