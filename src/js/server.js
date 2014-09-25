var express = reequire('express');

var app = express();

app.set('view engine', 'jade');

app.get('*', function(req, res) {
    res.remder('index');
});
