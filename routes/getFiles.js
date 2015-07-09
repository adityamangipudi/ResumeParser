/**
 * Created by adityamangipudi1 on 7/8/15.
 */
/**
 * Created by adityamangipudi1 on 7/8/15.
 */
var express = require('express');
/*var phoneUtil = require('google-libphonenumber').phoneUtil
    , PNF = require('google-libphonenumber').PhoneNumberFormat
    , PNT = require('google-libphonenumber').PhoneNumberType;*/
var fs = require('fs');
var Promise = require('promise');

var FileModel = require('../models/FileModel');
var router = express.Router();



/* Post Uploads home page. */
router.post('/', function(req, res, next) {
        console.log('getfiles', req.body);
        var files = req.body;
    var phonePattern= /\({0,1}\s*\d{3}?\s*\){0,1}\-*\s*\d{3}?\s*\-*(\­\‐)*\s*\d{4}/gmi;
    var emailPattern= /[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?/i;

    var results = []
        var filesPromises = files.map(function(file){
            return new Promise(function(resolve, reject){
            fs.readFile('./textFiles/'+file+'.txt', 'utf8', function (err,data) {
                if (err) {
                    return console.log(err);
                }
                var emails = data.match(emailPattern);
                var phones = data.match(phonePattern);
                console.log('emails', emails);
                console.log('phones',phones);
                var obj = {
                    name: file,
                    timestamp: Date.now(),
                    email: emails,
                    phone: phones
                };
                (new FileModel(obj)).save(function (err, result) {
                    if (err) reject(err);
                    else resolve(result);

                });

            });
            });
        });

        Promise.all(filesPromises).done(function(results){
            res.status(201).json(results);
        },function(err) {
            res.status(500).json(err);
        });

});



module.exports = router;
