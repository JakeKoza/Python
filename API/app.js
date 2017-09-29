var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
var fs = require('fs');
var https = require('https')

var options = {
  key: fs.readFileSync('../server.key'),
  cert: fs.readFileSync('../server.crt')
};

var app = express();
var router= express.Router();

var port = process.env.PORT || 5000;

var APIRouter = require('./src/routes/apiRoutes')();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'batata'}));

app.set('views','./src/views');
app.set('view engine', 'ejs');
app.get('/', function(req, res){
	res.send("Hello, World");
});
app.use('/API', APIRouter);


app.listen(port, function(err){
	console.log('Running server on port ' + port);
});

var httpsServer = https.createServer(options, app);
httpsServer.listen(8443);