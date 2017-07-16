/* globals __dirname */
const path = require('path');
const fs = require('fs');

const express = require('express');

module.exports = (app) => {
    // View Engine
    app.set('view engine', 'pug');
    app.use(express.static( __dirname + '/../public'));
};
