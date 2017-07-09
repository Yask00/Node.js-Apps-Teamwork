/* globals process __dirname*/

const express = require('express');
const app = express();

// eslint-disable-next-line no-process-env
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(port, () => {
    console.log(`App started on localhost:${port}`);
});
