require('require-stars')(require('module'), require('browserify/lib/wrap'));

var requireEnum = require('require-stars/enum'),
    browserify = require('browserify'),
    socket_io = require('socket.io'),
    Inliner = require('inliner'),
    express = require('express'),
    uuid = require('node-uuid'),
    http = require('http'),
    path = require('path'),
    zlib = require('zlib');

var app = express(),
    server = http.createServer(app);

app.io = socket_io.listen(server);

app.configure(function(){
	app.set('port', process.env.PORT || 3000);

	app.use(express.favicon());
	app.use(express.logger('dev'));

	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);

	var bundle = browserify({watch: app.get('env') === 'development'}).
		addEntry(path.join(__dirname, '..', 'client', 'index.js'));

	app.use(bundle);
	app.use(express.static(path.join(__dirname, '..', 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.configure('production', function(){
	app.on('inline index', function () {
		new Inliner('http://127.0.0.1:' + app.get('port') + '/index.html', function (html) {
			zlib.gzip(html, function (err, buffer) {
				var etag = uuid.v1();
				app.get('/', function (request, response) {
					if (request.headers['if-none-match'] === etag) {
						return response.send(304);
					}
					response.set({
						'Content-Type': 'text/html',
						'Content-Length': buffer.length,
						'Content-Encoding': 'gzip',
						'ETag': etag
					});
					response.send(200, buffer);
				});
			});
		});
	});
});

require('./models/**');

requireEnum(require('./routes/**'), function (imports) {
	imports(app);
});

requireEnum(require('./messages/**'), function (imports) {
	imports(app.io, app);
});


server.listen(app.get('port'), function(){
	app.emit('inline index');
	console.log("Express server listening on " +
		app.get('port') + ' in ' + app.get('env'));
});
