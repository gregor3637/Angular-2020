'use strict';

const functions = require('firebase-functions');
const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;
const cors = require('cors')({ origin: true });
const Busboy = require('busboy');
const fs = require('fs');

const gcconfig = {
    projectId: "angular2020-9c230",
    keyFilename: "angular2020-9c230-firebase-adminsdk-uoenq-62757be5be.json"
};

// const gcs = require('@google-cloud/storage')(gcconfig);

const {Storage} = require('@google-cloud/storage');
const client = new Storage(gcconfig);

const admin = require('firebase-admin');
const mkdirp = require('mkdirp-promise');


admin.initializeApp();

// File extension for the created JPEG files.
const JPEG_EXTENSION = '.jpg';


exports.uploadFile = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        if (req.method != 'POST') {
            return res.status(500).json({
                message: 'Not allowed xx.xx'
            });
        }

        const busboy = new Busboy({ headers: req.headers });

        let uploadData = null;

        busboy.on('file', (fieldname, file, filename, encodint, mimetype) => {
            const filepath = path.join(os.tmpdir(), filename);
            this.uploadFile = { file: filepath, type: mimetype }
            file.pipe(fs.createWriteStream(filepath));
        });


        busboy.on('finish', () => {
            console.log('t - 1');
            const bucket = new Storage.Bucket('angular2020-9c230.appspot.com');
            console.log('t - 2');
            bucket.upload(uploadData.file, function(err, file) {
                console.log('t - 3');
                console.log("Created object gs://my-sample-bucket/sample.txt");
            });
            console.log('t - 4');
            
        });

        busboy.end(req.rawBody);
    });
});