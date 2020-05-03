// const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
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

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
//const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
//fs.readFile('credentials.json', (err, content) => {


//});


function start(){
  if(credentials){
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(credentials, listFiles);
    } else{
      return console.log('Error loading client secret file:');
    } 
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  //fs.readFile(TOKEN_PATH, (err, token) => {
    if(token){
      oAuth2Client.setCredentials(token);
      callback(oAuth2Client);
    } else {
      return getAccessToken(oAuth2Client, callback);
    }
   
    
  //});
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
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
  const drive = google.drive({version: 'v3', auth});
  drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = res.data.files;
    if (files.length) {
      console.log('Files:');
      files.map((file) => {
        console.log(`${file.name} (${file.id})`);
      });
    } else {
      console.log('No files found.');
    }
  });
}
$( document ).ready(function() {
    $("#show").on("click",function(event){
      start();
    })
})


