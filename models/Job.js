var mongoose = require("mongoose");
var Promise = require('bluebird');
var jobsData = require('../jobs-data.js');

var jobSchema = mongoose.Schema({
    title: {type:String},
    description: {type:String}
});

var jobs = [
        {title: 'Tom Corbin', description: 'Hanging out in Texas'},
        {title: 'Steve Ingram', description: 'Hanging out in Berlin'},
        {title: 'Kerstin Dengl', description: 'Hanging out in Augsburg'},
        {title: 'Ken Southerland', description: 'Hanging out in Cloud Cuckoo Land'},
    ];

var Job = mongoose.model('Job', jobSchema);

var createJob = Promise.promisify(Job.create, Job);

exports.seedJobs = function() {
    return jobsData.findJobs({}).then(function(collection) {
//        console.log(collection);
        if (collection.length === 0) {
            return Promise.map(jobs, function(job) {
//                console.log(job);
                return createJob(job);
            });
        }
    });
};
