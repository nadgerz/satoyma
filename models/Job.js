var mongoose = require("mongoose");
var Promise = require('bluebird');

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

function findJobs(query) {
    return Promise.cast(mongoose.model('Job').find(query).exec());
}

var createJob = Promise.promisify(Job.create, Job);

exports.seedJobs = function() {
    retrun findJobs({}).then(function(collection) {
        if (collection.length === 0) {
            return Promise.map(jobs, function(job) {
                return createJob(job);
            });
        }
    });
};
