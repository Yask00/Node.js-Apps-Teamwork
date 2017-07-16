/* globals process __dirname*/


const express = require('express');
const app = express();

require('./config/express-config')(app);
require('./config/auth-config')(app);
require('./routers')(app);

// eslint-disable-next-line no-process-env
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App started on localhost:${port}`);
});
