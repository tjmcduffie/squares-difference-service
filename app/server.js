
var restify = require('restify');
var bunyan = require('bunyan');
var mongo = require('./lib/MongoConnection');

mongo.connect();

var server = restify.createServer({
  name: 'Squares differences',
  version: 'v1.0.0',
  log: bunyan.createLogger({name: "SDS"})
});

server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());
server.use(restify.CORS());
server.use(restify.fullResponse());

require('./routes')(server);

server.listen(8080);