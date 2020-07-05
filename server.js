const express = require('express'); 
//const crypto = require('crypto');
var http = require('http'); //importing http
var nodemailer = require('nodemailer');
const path = require('path');
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
var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
function startKeepAlive() {
  setInterval(function() {
      var options = {
          host: 'https://serveee.herokuapp.com',
          port:  port,
          path: '/getActiveCourosal',
          method : 'GET'
      };
      http.request(options, function(res) {
          res.on('data', function(chunk) {
              try {
                  // optional logging... disable after it's working
                  console.log("HEROKU RESPONSE: " + chunk);
              } catch (err) {
                  console.log(err.message);
              }
          });
      }).on('error', function(err) {
          console.log("Error: " + err.message);
      });
  }, 2 * 1 * 1000); // load every 20 minutes
}
startKeepAlive();
app.use(myLogger);
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
function doSome(){
  let userObject={};
 //console.log(nodemailer);
 let web=`<h1 style="color:red">USER DETAILS WHILE LOGGING IN</h1><h2 href="http://ganainteriors.freetzi.com" style="color:green;">some one is seeing your website</h2>`;
 mailOptions.html=web;
 mailOptions.subject="Some One is seeing your gana website Please fallow up him";
//   if(req.username=='faculty' && req.password=='faculty'){
//     userObject.loggedin=true;
//     userObject.userName=req.username;
//   } else{
//     userObject.loggedin=false;
//     userObject.userName=req.username;
//   }
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
//     let headers='';
	
// //     con.query("SELECT * FROM Persons", function (err, result, fields) {
// //       if (err) throw err;
// //       let keys=Object.keys(result[0]);
// //       keys.forEach(header=>{
// //         headers=headers+' '+header;
// //       })
// //       headers=headers+" "+"this was developped by bharath";

//      // result.unshift(userObject);
//      //res.send(result);
//       //con.destroy();
//     });
 }


app.listen(port, function (err) { 
	if(err){ 
    console.log("error while starting server"); 
    if (err) throw err;
	} 
	else{ 
    console.log("server has been started at "+port);
    stayOn(); 
	} 
}) 
function stayOn(){
  setInterval(()=>{
    console.log('server is in on mode');
  },15000);
}
app.get('/', function (req, res) { 
     //var gfg = encrypt('bharath');
//console.log(gfg);
//console.log(decrypt(gfg));
//res.send('we are at the root route of our server'); 
//console.log(req.headers);
console.log('calling this for all')
 con = mysql.createConnection({
  host: "us-cdbr-iron-east-05.cleardb.net",
  user: "b0cf765cc1f1be",
  password: "c6e5c9ce",
  database: "heroku_44d6ee1f0746480"
});

  con.connect(function(err) {
    if (err){};
     //doSome(res,req.headers);
  });
  con.on('error', function() {});


}) ;
var StatusNotes=[
  {"status": "Altered",
    "note": "26/08/2020"},
    {"status": "Altered",
    "note": "26/08/2020"},
    {"status": "Altered",
    "note": "26/08/2020"}
]
app.get('/statusNotes', function (req, res) { 

   let obj={
     "statusCode": 200,
      "resPayLoad":StatusNotes
   }
       res.send(obj); 
       });

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
        start(fileName.name,fileTypee,path,'fileUpload');
    }

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({ status: 'success', path: '/img/houses/' + fileName }))
  })
}) 

app.get('/getActiveCourosal', function (req, res) { 
 let response= start('','','','','getDriveFilesList');
   // res.send('redirecting to name'); 
    });
    app.get('/kitchenImages', function (req, res) { 
     doSome();
      let array=["https://drive.google.com/uc?id=1uOCvjrprzp704Bw8IP1HP5EXYF-WK9PK&export=download",
      "https://drive.google.com/uc?id=1R9fZIy10WdI2k7n7ef0CT8edPWgI7_zH&export=downloa",
      "https://drive.google.com/uc?id=1uOCvjrprzp704Bw8IP1HP5EXYF-WK9PK&export=download",
      "https://drive.google.com/uc?id=1uOCvjrprzp704Bw8IP1HP5EXYF-WK9PK&export=download",
      "https://drive.google.com/uc?id=1uOCvjrprzp704Bw8IP1HP5EXYF-WK9PK&export=download",
      "https://drive.google.com/uc?id=1uOCvjrprzp704Bw8IP1HP5EXYF-WK9PK&export=download",
      ];
          res.send(array); 
          });
    app.get('/glib', function (req, res) { 
      res.setHeader('Content-Type', 'text/html');
      //res.setHeader('content-encoding', 'gzip');
      // res.writeHead(200, {
      //   'Content-Type': 'text/html'
      // })
      //console.log(res);
      res.sendFile(__dirname +'/index.html');
         });
         app.get('/runTime', function (req, res) { 
          res.setHeader('Content-Type', 'application/javascript');
          res.setHeader('content-encoding', 'gzip');
          // res.writeHead(200, {
          //   'Content-Type': 'text/html'
          // })
          //console.log(res);
          res.sendFile(__dirname +'/runtime.1c6d391a01f9846ff6bb.js.gz');
             });
             app.get('/polyFills', function (req, res) { 
              res.setHeader('Content-Type', 'application/javascript');
              res.setHeader('content-encoding', 'gzip');
              // res.writeHead(200, {
              //   'Content-Type': 'text/html'
              // })
              //console.log(res);
              res.sendFile(__dirname +'/polyfills.bebee6a5ef0ece001bc6.js.gz');
                 });
                 app.get('/scripts', function (req, res) { 
                  res.setHeader('Content-Type', 'application/javascript');
                  res.setHeader('content-encoding', 'gzip');
                  // res.writeHead(200, {
                  //   'Content-Type': 'text/html'
                  // })
                  //console.log(res);
                  res.sendFile(__dirname +'/scripts.17b5f78b930456118434.js.gz');
                     });
                     app.get('/main', function (req, res) { 
                      res.setHeader('Content-Type', 'application/javascript');
                      res.setHeader('content-encoding', 'gzip');
                      // res.writeHead(200, {
                      //   'Content-Type': 'text/html'
                      // })
                      //console.log(res);
                      res.sendFile(__dirname +'/main.b9bd5389778648068224.js.gz');
                         });
                         app.get('/styles', function (req, res) { 
                          res.setHeader('Content-Type', 'text/css');
                          res.setHeader('content-encoding', 'gzip');
                          // res.writeHead(200, {
                          //   'Content-Type': 'text/html'
                          // })
                          //console.log(res);
                          res.sendFile(__dirname +'/styles.2bed39400ceae1fdf0e5.css.gz');
                             });
                             app.get('/chunk', function (req, res) { 
                              res.setHeader('Content-Type', 'text/css');
                              res.setHeader('content-encoding', 'gzip');
                              // res.writeHead(200, {
                              //   'Content-Type': 'text/html'
                              // })
                              //console.log(res);
                              res.sendFile(__dirname +'/4.42eba9d8b35b5a2228b5.js.gz');
                                 });
                                 app.get('/slick.d41f55a78e6f49a55128.ttf', function (req, res) { 
                                  res.setHeader('Content-Type', 'text/html');
                                  res.setHeader('content-encoding', 'gzip');
                                  // res.writeHead(200, {
                                  //   'Content-Type': 'text/html'
                                  // })
                                  //console.log(res);
                                  res.sendFile(__dirname +'/slick.d41f55a78e6f49a55128.ttf.gz');
                                     });
                                     app.get('/slick.b7c9e1e479de3b53f1e4.woff', function (req, res) { 
                                      res.setHeader('Content-Type', 'text/html');
                                      res.setHeader('content-encoding', 'gzip');
                                      // res.writeHead(200, {
                                      //   'Content-Type': 'text/html'
                                      // })
                                      //console.log(res);
                                      res.sendFile(__dirname +'/slick.b7c9e1e479de3b53f1e4.woff.gz');
                                         });
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
      app.get(':80', function (req, res) { 
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
function start(filename,mimeType,path,ApiCall){
  console.log('file name .........');
  console.log(filename);
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    //authorize(JSON.parse(content), listFiles);
    //authorize(JSON.parse(content), getFile);
    if(ApiCall=='fileUpload'){
  let reponse = authorize(JSON.parse(content), uploadFile,filename,mimeType,path,'fileUpload');
    } else if(ApiCall=='getDriveFilesList'){
   let reponse = authorize(JSON.parse(content), listFiles,'','','','getDriveFilesList');
    }
    else if(ApiCall=='createFolder'){
      let reponse = authorize(JSON.parse(content), createFolder,'','','','createFolder');
       }
       else if(ApiCall=='moveBetweenFolder'){
        let reponse = authorize(JSON.parse(content), movefilesBetweenFOlder,'','','','moveBetweenFolder');  
       } else if(ApiCall=='deleteFile'){
        let reponse = authorize(JSON.parse(content), deleteFile,'','','','deleteFile'); 
       }
});
}
// Load client secrets from a local file.

function getGoogleDriveFilesList(){
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    //authorize(JSON.parse(content), listFiles);
    authorize(JSON.parse(content), getFile);
   // authorize(JSON.parse(content), uploadFile,filename,fileType,mimeType,path);
}); 
}
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback,filename,mimeType,path,getParticularId) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        let response;
      //  callback(oAuth2Client,filename,mimeType,path);//list files and upload file
      if(getParticularId=='fileUpload'){
        response= callback(oAuth2Client,filename,mimeType,path);//list files and upload file  
      }else if(getParticularId=='getDriveFilesList'){
        response= callback(oAuth2Client);//list files and upload file  
      } else if(getParticularId=='moveBetweenFolder'){
        response= callback(oAuth2Client); 
      } else if(getParticularId=='deleteFile'){
        response= callback(oAuth2Client); 
      }
      else if(getParticularId=='createFolder'){
        response= callback(oAuth2Client,'testingFolderchild');//list files and upload file  
      }else if(getParticularId && getParticularId.length>=1){
        response= callback(oAuth2Client, '1R9fZIy10WdI2k7n7ef0CT8edPWgI7_zH');
       }
      //  callback(oAuth2Client, '1R9fZIy10WdI2k7n7ef0CT8edPWgI7_zH');//get file
         return response;
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
        pageSize: 1000,
        q: "'" + '184Zws5fHfMVYBAjUFfp_X1p4-TQ2e_G5' + "' in parents and trashed=false",
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
    files.forEach((file,i) => {
        // console.log(file.name + '|' + file.size + '|' + file.createdTime + '|' + file.modifiedTime);
        //if(file.mimeType=='application/vnd.google-apps.folder'){
         // if(file.name=='testingFolder'){
           if(i==0){
            console.log(file);
           }
           
         // }
      // }
    });
}
function uploadFile(auth,filename,mimeType,path) {
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
    console.log('inside upload function');
    console.log(media);
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

function createFolder(auth,folderName){
  const drive = google.drive({ version: 'v3', auth });
  var folderId = '184Zws5fHfMVYBAjUFfp_X1p4-TQ2e_G5';
  var fileMetadata = {
    'name':folderName,
    'mimeType': 'application/vnd.google-apps.folder',
    parents: [folderId]
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
      console.log('Folder Id: ', file);
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

function movefilesBetweenFOlder(auth){
  const drive = google.drive({ version: 'v3', auth });
  fileId = '15S2uA57vtPa6kKA4P_7s7rFWoRn0Rlog'
folderId = '1HFqPeW0-N_ITymF33s_5xK5osiLF2mRw'
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
    console.log(file.data.parents[0]);
    var previousParents = file.data.parents[0];
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


function deleteFile(auth){
  const drive = google.drive({ version: 'v3', auth });
  drive.files.delete({
    'fileId': '15S2uA57vtPa6kKA4P_7s7rFWoRn0Rlog'
  }, function (err, file) {
  if (err) {
    // Handle error
    console.error(err);
  } else {
    console.log('File Id: ', file);
  }
});
}


// start('','','','createFolder');
