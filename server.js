(function() {
  'use strict';
 
  var express = require('express');
  var path = require('path');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');
  var session = require('express-session');
  var fs = require("fs");
  var multipart = require('connect-multiparty');
  var multipartMiddleware = multipart();
  var php=require('node-php');
  var multer=require('multer');
  var app = express();

  
  app.use(express.static(path.join(__dirname + '/public')));
  app.use(express.static(path.join(__dirname + '/server/routes/images')));
  app.set('views', path.join(__dirname, '/public'));

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');




  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

 
  app.use(session({secret: 'mySessionKey'}));


//myFunction


  require('./server/routes/index' )( app );
  require('./server/routes/auditor' )( app );

  app.set('port', process.env.PORT || 8080);
 
  var server = app.listen(app.get('port'),function() {
    console.log('Express server listening on port ' + server.address().port);
  });
 
  module.exports = app;
}());
