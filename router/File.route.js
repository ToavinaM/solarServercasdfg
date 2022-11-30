const route = require('express').Router();
const Mapping = require('../models/Mapping');
var multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const maxSize = 1 * 1000 * 1000;
var upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {

        var filetypes = /jpeg|jpg|png|pdf/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(path.extname(
            file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("Error: File upload only supports the "
            + "following filetypes - " + filetypes);
    }
    // fileSolar is the name of file attribute
}).single("fileSolar");


route.post('/upload', upload, (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename)

        ////baseUrl
        // var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
        // var insertData = "INSERT INTO users_file(file_src)VALUES(?)"
        // db.query(insertData, [imgsrc], (err, result) => {
        //     if (err) throw err
        //     console.log("file uploaded")
        // })
    }
    // Mapping.execute(sql).then(rep => {
    //     return res.send(rep);
    // }).catch(error => {
    //     return res.send({ error });
    // });
})

module.exports = route;