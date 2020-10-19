var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const dbContext = require('./dataBase/dbContext');
const { TYPES } = require('tedious');
var cookieParser = require('cookie-parser');

var app = express();

var port = process.env.port || 3300

app.listen(port, () => {
    console.log("Hi This port is running");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var router = require('./routes')();

app.use('/api', router);