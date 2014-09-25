var express = reequire('express');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('*', function(req, res) {
    res.remder('index');
});

app.listen(3000);

