var mongoose = require("mongoose");

var jobSchema = mongoose.Schema({
    title: {type:String},
    description: {type:String}
});

var Job = mongoose.model('Job', jobSchema);

exports.seedJobs = function(callback) {
    Job.find({}).exec(function(error, collection) {
        if (collection.length === 0) {
            Job.create({title: 'Tom Corbin', description: 'Hanging out in Texas'});
            Job.create({title: 'Steve Ingram', description: 'Hanging out in Berlin'});
            Job.create({title: 'Kerstin Dengl', description: 'Hanging out in Augsburg'});
            Job.create({title: 'Ken Southerland', description: 'Hanging out in Cloud Cuckoo Land'}, callback);
        }
    });
}
