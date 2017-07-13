/* globals __dirname */
const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

module.exports = (app) => {
    // View Engine
    app.set('view engine', 'pug');
    app.use(express.static( __dirname + '/../public'));

    // BodyParser Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
};
