var express = require('express');
var mongoose = require('mongoose');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname));

app.get('*', function(req, res) {
    res.render('index');
});

var port = process.env.PORT || 3000;
var ip   = process.env.IP   || "localhost";

mongoose.connect('mongodb://localhost/jobfinder');

var conn = mongoose.connection;

conn.once('open', function() {
    console.log('connected to mongodb successfully');
});

app.listen(port, ip);

console.log('Please open http://' + ip + ':' + port + '/');

