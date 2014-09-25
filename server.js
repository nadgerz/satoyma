var express = require('express');
var mongoose = require('mongoose');
var jobModel = require('./models/Job');
var jobsData = require('./jobs-data.js');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname));

app.get('/api/jobs', function(req, res) {
    jobsData.findJobs().then(function(error, collection) {
        res.send(collection);
    });
});

app.get('*', function(req, res) {
    res.render('index');
});

var port = process.env.PORT || 3000;
var ip   = process.env.IP   || "localhost";

//mongoose.connect('mongodb://localhost/jobfinder');
jobsData.connectDB('mongodb://dms:nrg@ds039850.mongolab.com:39850/jobfinder')
.then(function() {
    console.log('connected to mongodb successfully');
    jobModel.seedJobs();
});


app.listen(port, ip);

console.log('Please open http://' + ip + ':' + port + '/');

