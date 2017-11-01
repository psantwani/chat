const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./functions/create_user');
const serviceAccount = require('./config/service_account.json');
const requestOneTimePassword = require('./functions/request_one_time_password');
const verifyOneTimePassword = require('./functions/verify_one_time_password');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chat-49f98.firebaseio.com"
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword);
exports.verifyOneTimePassword = functions.https.onRequest(verifyOneTimePassword);