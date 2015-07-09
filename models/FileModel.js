/**
 * Created by adityamangipudi1 on 7/9/15.
 */
var mongoose = require('mongoose')
var FileModel = mongoose.model('fileData', {
    name: {
        type: String,
        required: true,
        unique: true
    }, timestamp:{
        type: Object
    },email: {
        type: Array

    }, phone:{
        type: Array
    }
});
module.exports = FileModel;
