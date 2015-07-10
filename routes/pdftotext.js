/**
 * Created by adityamangipudi1 on 7/8/15.
 */
var pdfUtil = require('pdf-text');
var fs = require('fs');
var Promise = require('promise');
var pdfUtil2 = require('pdf-to-text');
var pdf_path = "absolute_path/to/pdf_file.pdf";



module.exports = function(fileData, cb){
    //console.log('here', fileData.file);



    var data = [];
    data = fileData.file.map(function(file){
        console.log(file);
        pdfUtil2.info('./'+file.path, function(err, info) {
            if (err) throw(err);
            console.log(info);
        });
        pdfUtil2.pdfToText('./'+file.path, function(err, data) {
            if (err) throw(err);
            console.log(data); //print all text
        });
        return new Promise(function(resolve, reject){
            pdfUtil2.pdfToText('./'+file.path, function (err, info) {
            if (err) reject(err);

           //console.log('here', info);
            else{
                var fileName = file.originalname.replace('.pdf','_orig')+ '_'+file.name.replace('.pdf','_unique');
                //console.log(fileName);
                var fileout = fs.createWriteStream('./textFiles/'+fileName+'.txt');
              fileout.on('error', function(err) { throw err });
                /*info = info.map(function(line){

                    return line.replace(/\t\r/g, '').replace(/\s+/g,' ');
                });*/
                console.log(info);

              fileout.write(info);


              fileout.end();
                resolve(fileName);
            }

        });
        });
    });
    Promise.all(data).done(function(results){
        data = results;
        //console.log('texts',data);
        cb(null, data);

    }, function(err){
         cb(err);
    });

}



