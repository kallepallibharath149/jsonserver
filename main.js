// const express = require('express'); 
// //const crypto = require('crypto');
// var nodemailer = require('nodemailer');
// const app = express(); 
// const Cryptr = require('cryptr');
// const cryptr = new Cryptr('bharath');
// var bodyParser = require('body-parser');
// const fileupload = require('express-fileupload');
// var mysql = require('./node_modules/mysql');
// const port = process.env.YOUR_PORT || process.env.PORT || 5000;
//var mysql = require('mysql');
// var cors = require('cors');
var $=require('jquery');
var token={
    "access_token": "ya29.a0Adw1xeWdKmva3j9UFVu8ibQNV_rYFJmRDzCWxSJbxrv2-uk3VB_916FapQ1pv2M2-6zzqXnsAhdCyCGFyQHlIuwodkTN7imOVDFXVBNv1gXN052ng6ibSE9yj_Lczl3Wjy32PZsyhZQDNkCzjNg26k_YKbpLnM1yF98",
    "refresh_token": "1//0gFCY2HlbzOSUCgYIARAAGBASNwF-L9IrTvayvxsXyGnbVoGsw3WfybSnVNUE8VJLE7isc9K6V-OT_p2dpxogs3BEgVbNnGBMoyQ",
    "scope": "https://www.googleapis.com/auth/drive.file",
    "token_type": "Bearer",
    "expiry_date": 1584887965115
  };
  var credentials={
    "installed": {
      "client_id": "139480899737-u9dvej83jj653hak0cfq2qoeu8cgikso.apps.googleusercontent.com",
      "project_id": "ganainteriors-1584779371622",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_secret": "HSsOf8w7NIuj2z1h52Qo0sq-",
      "redirect_uris": [
        "urn:ietf:wg:oauth:2.0:oob",
        "http://localhost"
      ]
    }
  };
var fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
var con;
// app.use(cors());
// app.use(bodyParser.json());
// app.use(
//   fileupload());
// const encryptedString = cryptr.encrypt('bharath');
// const decryptedString = cryptr.decrypt(encryptedString);
// app.post('/fileupload', function (req, res) {  
//   // Prepare output in JSON format  
//   const fileName = req.files.myFile;
//   let fileTypee = fileName.mimetype;
// let index=fileTypee.indexOf('/')+1;
// var data=fileTypee.slice(index,fileTypee.length+1);
//   const path = __dirname + `/bharath.${data}`;
//   let fileNamee='bharath.'+data;
//   let fileType=data;
// console.log(fileName);
// fileName.mv(path, (error) => {
//     if (error) {
//       console.error(error)
//       res.writeHead(500, {
//         'Content-Type': 'application/json'
//       })
//       res.end(JSON.stringify({ status: 'error', message: error }))
//       return
//     } else{
//       if(fileType==='jpeg' || fileType==='jpg'){
//         start(fileNamee,fileType);
//       }
//     }

//     res.writeHead(200, {
//       'Content-Type': 'application/json'
//     })
//     res.end(JSON.stringify({ status: 'success', path: '/img/houses/' + fileName }))
//   })
// }) 


 
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
//const TOKEN_PATH = './assets/fileuploadScripts/token.json';
function start(){
//   fs.readFile('./assets/fileuploadScripts/credentials.json', (err, content) => {
    if(Object.keys(credentials).length<=0){
        return console.log('Error loading client secret file:', err);
    } else{
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(credentials, listFiles);
   // authorize(JSON.parse(content), getFile);
   //authorize(JSON.parse(credentials));
    } 
}
// Load client secrets from a local file.


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
   if(Object.keys(token).length<=0){
    return getAccessToken(oAuth2Client, callback);
   } else{
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);//list files and upload file
    //callback(oAuth2Client, '1qGyGd6sLJas9h9qlChOdv41oF2mC0Vtg');//get file
   }
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
        input: process.stdin,
        output: process.stdout,
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
function uploadFile(auth,filename,fileType) {
    const drive = google.drive({ version: 'v3', auth });
    let mimetype='';
    if(fileType=='jpeg'){
       mimetype='image/jpeg';
    } else if(fileType==='mp4'){
       mimetype='video/mp4';
    } else if(fileType=='jpg'){
      mimetype='image/jpeg';
    }
    var fileMetadata = {
        'name': filename
    };
    var media = {
        mimeType: mimetype,
        body: fs.createReadStream(filename)
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
        } else {
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

function showNotification(){
    alert('hello this is from node modules file alert');
    console.log('hello this is from node modules file alert');
}
// $( document ).ready(function() {
//     $("#show").on("click",function(event){
//       start();
//     })
// })
start();