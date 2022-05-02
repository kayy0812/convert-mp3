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

const config = require(__dirname + '/config');
const youtubeApi = require(__dirname + '/api/youtube');

const Application = express();

console.log('OH! STARTED');


Application.use(bodyParser.json());
Application.use(cookieParser());
Application.use(bodyParser.urlencoded({ extended: false }));

Application.use('/static', express.static('Resources'));
Application.set('view engine', 'ejs');

Application.use('/', youtubeApi);

Application.listen(3000);
