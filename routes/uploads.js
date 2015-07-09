/**
 * Created by adityamangipudi1 on 7/8/15.
 */
var express = require('express');
var multer  = require('multer');
var pdfConvertor  = require('../routes/pdftotext.js');
var Promise = require('promise');

var router = express.Router();


router.use(multer({ dest: './uploads/'}));

/* Post Uploads home page. */
router.post('/', function(req, res, next) {
    //console.log(req.files);
    var files= [];
        req.files.file.length>1?files = req.files: files = {file: [req.files.file]};


    pdfConvertor(files, function(err, result){
        if(err) console.log(err);
        else {
            console.log(result);

            res.status(201).json(result);
        }
    });

});



module.exports = router;
