const express = require('express'); 
//const crypto = require('crypto');
var nodemailer = require('nodemailer');
const app = express(); 
const Cryptr = require('cryptr');
const cryptr = new Cryptr('bharath');
var bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
var mysql = require('./node_modules/mysql');
const port = process.env.YOUR_PORT || process.env.PORT || 5000;
//var mysql = require('mysql');
var cors = require('cors');
var fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
var con;
app.use(cors());
app.use(bodyParser.json());
app.use(
  fileupload());
const encryptedString = cryptr.encrypt('bharath');
const decryptedString = cryptr.decrypt(encryptedString);
//console.log(encryptedString); 
//console.log(decryptedString);
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
  auth: {
    user: 'raju221156@gmail.com',
    pass: 'lvmgicqeezlireuo'
  }
});
var mailOptions = {
  from: 'raju221156@gmail.com',
  to: 'raju221156@gmail.com',
  subject: 'Some One trying to login OEC Application',
  html: ''
};
function doSome(res ,req){
  let userObject={};
 //console.log(nodemailer);
 let web=`<h1 style="color:red">USER DETAILS WHILE LOGGING IN</h1><h2 href="http://ganainteriors.freetzi.com" style="color:green;">${req.username}</h2>`;
 mailOptions.html=web;
 mailOptions.subject="USER DETAILS WHILE LOGGING IN";
  if(req.username==' bharath' && req.password=='bharath'){
    userObject.loggedin=true;
    userObject.userName='faculty';
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
//console.log(req.headers);
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
app.post('/fileupload', function (req, res) {  
  // Prepare output in JSON format  
  const fileName = req.files.myFile;
  let fileTypee = fileName.mimetype;
	console.log("mime type",fileTypee);
let index=fileTypee.indexOf('/')+1;
var data=fileTypee.slice(index,fileTypee.length+1);
  const path = __dirname + `/${fileName.name}`;
  let fileNamee='bharath.'+data;
  let fileType=data;
console.log(fileName);
fileName.mv(path, (error) => {
    if (error) {
      console.error(error)
      res.writeHead(500, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify({ status: 'error', message: error }))
      return
    } else{
        start(fileName.name,fileType,fileTypee,path);
    }

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({ status: 'success', path: '/img/houses/' + fileName }))
  })
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
       // console.log(req); 
        res.send('bharath'); 
        });
        app.get('/na', function (req, res) {
           // console.log(req); 
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
//Drive API, v3
//https://www.googleapis.com/auth/drive	See, edit, create, and delete all of your Google Drive files
//https://www.googleapis.com/auth/drive.file View and manage Google Drive files and folders that you have opened or created with this app
//https://www.googleapis.com/auth/drive.metadata.readonly View metadata for files in your Google Drive
//https://www.googleapis.com/auth/drive.photos.readonly View the photos, videos and albums in your Google Photos
//https://www.googleapis.com/auth/drive.readonly See and download all your Google Drive files
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';
function start(filename,fileType,mimeType,path){
  console.log('file name .........');
  console.log(filename);
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    //authorize(JSON.parse(content), listFiles);
   // authorize(JSON.parse(content), getFile);
    authorize(JSON.parse(content), uploadFile,filename,fileType,mimeType,path);
});
}
// Load client secrets from a local file.


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback,filename,fileType,mimeType,path) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client,filename,fileType,mimeType,path);//list files and upload file
        //callback(oAuth2Client, '1qGyGd6sLJas9h9qlChOdv41oF2mC0Vtg');//get file

    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        //input: process.stdin,
        //output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
    const drive = google.drive({ version: 'v3', auth });
    getList(drive, '');
}
function getList(drive, pageToken) {
    drive.files.list({
        corpora: 'user',
        pageSize: 10,
        //q: "name='elvis233424234'",
        pageToken: pageToken ? pageToken : '',
        fields: 'nextPageToken, files(*)',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
            console.log('Files:');
            processList(files);
            if (res.data.nextPageToken) {
                getList(drive, res.data.nextPageToken);
            }

            // files.map((file) => {
            //     console.log(`${file.name} (${file.id})`);
            // });
        } else {
            console.log('No files found.');
        }
    });
}
function processList(files) {
    console.log('Processing....');
    files.forEach(file => {
        // console.log(file.name + '|' + file.size + '|' + file.createdTime + '|' + file.modifiedTime);
        console.log(file);
    });
}
function uploadFile(auth,filename,fileType,mimeType,path) {
    const drive = google.drive({ version: 'v3', auth });
    createFolder('bharath',drive)
//     let mimetype='';
//     if(fileType=='jpeg'){
//        mimetype='image/jpeg';
//     } else if(fileType==='mp4'){
//        mimetype='video/mp4';
//     } else if(fileType=='jpg'){
//       mimetype='image/jpeg';
//     } else if(fileType=='xls'){
// 	 mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';       
//     }else if(fileType=='docx' ){
// 	 mimetype='application/vnd.ms-word.document.macroEnabled.12';       
//     }    else{
// 	 mimetype='application/octet-stream';       
//     }  
    var fileMetadata = {
        'name': filename
    };
    var media = {
        mimeType: mimeType,
        body: fs.createReadStream(path)
    };
    //console.log(media);
    drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, function (err, res) {
        if (err) {
            // Handle error
           console.log(err);
           fs.unlink(path, function(){
            if (err) {}
            else{
              console.log('File deleted!');
            }
            // if no error, file has been deleted successfully
             
          });
        } else {
          fs.unlink(path, function(){
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!'); 
          })
            console.log('File Id: ', res.data.id);
        }
    });
}
function getFile(auth, fileId) {
    const drive = google.drive({ version: 'v3', auth });
    drive.files.get({ fileId: fileId, fields: '*' }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        console.log(res.data);
    });
}

function createFolder(folderName,drive){
  var fileMetadata = {
    'name':folderName,
    'mimeType': 'application/vnd.google-apps.folder'
  };
  drive.files.create({
    resource: fileMetadata,
    fields: 'id'
  }, function (err, file) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      console.log('Folder Id: ', file.data.id);
    }
  });
}


function insertFileInFOlder(folderId){
  var folderId = '0BwwA4oUTeiV1TGRPeTVjaWRDY1E';
var fileMetadata = {
  'name': 'photo.jpg',
  parents: [folderId]
};
var media = {
  mimeType: 'image/jpeg',
  body: fs.createReadStream('files/photo.jpg')
};
drive.files.create({
  resource: fileMetadata,
  media: media,
  fields: 'id'
}, function (err, file) {
  if (err) {
    // Handle error
    console.error(err);
  } else {
    console.log('File Id: ', file.id);
  }
});
}

function movefilesBetweenFOlder(){
  fileId = '1sTWaJ_j7PkjzaBWtNc3IzovK5hQf21FbOw9yLeeLPNQ'
folderId = '0BwwA4oUTeiV1TGRPeTVjaWRDY1E'
// Retrieve the existing parents to remove
drive.files.get({
  fileId: fileId,
  fields: 'parents'
}, function (err, file) {
  if (err) {
    // Handle error
    console.error(err);
  } else {
    // Move the file to the new folder
    var previousParents = file.parents.join(',');
    drive.files.update({
      fileId: fileId,
      addParents: folderId,
      removeParents: previousParents,
      fields: 'id, parents'
    }, function (err, file) {
      if (err) {
        // Handle error
      } else {
        // File moved.
      }
    });
  }
});
}
