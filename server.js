var express = require('express');
var mongoose = require('mongoose');
var jobModel = require('./models/Job');
var jobsData = require('./jobs-data.js');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname));

app.get('/api/jobs', function(req, res) {
    //console.log(req);
    //console.log(res);
    jobsData.findJobs().then(function(collection) {
        res.send(collection);
    });
});

app.get('*', function(req, res) {
    res.render('index');
});

var port = process.env.PORT || 3000;
var ip   = process.env.IP   || "localhost";

var db_url;
db_url = 'mongodb://localhost/jobfinder';
db_url = 'mongodb://dms:nrg@ds039850.mongolab.com:39850/jobfinder';

jobsData.connectDB(db_url)
.then(function() {
    console.log('connected to mongodb [' + db_url + '] successfully');
    jobModel.seedJobs();
});

app.listen(port, ip);

console.log('Please open http://' + ip + ':' + port + '/');

