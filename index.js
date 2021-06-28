//\////////////////////////////////////////////////////\\
//\// - A Converter Tool [] -                        //\\
//\// - VERSION 1.0.0                                //\\
//\// - Entry point : index.js                       //\\
//\//                                                //\\
//\//                                                //\\
//\// - Write by kayy0812                            //\\             
//\////////////////////////////////////////////////////\\

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const prompt = require('prompt-sync')({ sigint: true });

const config = require(__dirname + '/config');
const guest = require(__dirname + '/Routes/Guest');
const admin = require(__dirname + '/Routes/Admin');

const Application = express();

console.log('OH! STARTED');

setInterval(function() {
  fs.readdir(__dirname + '/Temp/mp3', function(error, files) {
    var nowDate = new Date().getTime();
    var time_ago = new Date().toLocaleDateString("en-US", {
      month: 'long',
      day: 'numeric'
    });
    var totalFiles = files.length;
    var total_size = 0;
    files.forEach(function(file) {
      var size = fs.statSync(__dirname + '/Temp/mp3/' + file).size / 1024 / 1024;
      total_size += size;
      time_ago = Math.trunc((nowDate - fs.statSync(__dirname + '/Temp/mp3/' + file).mtimeMs) / 60 / 1000);
      if (time_ago >= 3) {
        fs.unlinkSync(__dirname + '/Temp/mp3/' + file);
        console.log(file + ' deleted!');
      }
    });
    if (total_size.toFixed(1) >= 399) {
      files.forEach(function(file) {
        fs.unlinkSync(__dirname + '/Temp/mp3/' + file);
        console.log(file + ' deleted!');
      });
    }
  });
}, 5 * 1000);


Application.use(bodyParser.json());
Application.use(cookieParser());
Application.use(bodyParser.urlencoded({ extended: false }));

Application.use('/static', express.static('Resources'));
Application.use('/temp', express.static('Temp'));
Application.set('views', __dirname + '/Views');
Application.set('view engine', 'ejs');

Application.use('/', guest);
Application.use('/admin', admin);

Application.listen(3000);
