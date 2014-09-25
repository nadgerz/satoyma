var express = require('express');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '../../bower_components'));

app.get('*', function(req, res) {
    res.render('index');
});

var port = process.env.PORT || 3000;
var ip   = process.env.IP   || "localhost";

app.listen(port, ip);

console.log(__dirname);
console.log('Please open http://' + ip + ':' + port + '/');

