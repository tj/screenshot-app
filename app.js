
/**
 * Module dependencies.
 */

var express = require('express')
, stylus = require('stylus')
, redis = require('redis')

app = express.createServer();

app.configure(function(){
    app.db = redis.createClient();
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('phantom', 'phantomjs');
    app.set('screenshots', '/tmp');
    app.set('default viewport width', 1024);
    app.set('default viewport height', 600);
    app.set('colors', 3);
    app.set('root', __dirname);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(stylus.middleware({ src: __dirname + '/public' }));
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
  });

app.configure('development', function(){
    app.use(express.errorHandler()); 
  });

require('./routes');

app.listen(3000);

console.log("Express server listening on port 3000");
