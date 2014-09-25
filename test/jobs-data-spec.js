var expect = require("chai").expect;
var mongoose = require('mongoose');
var jobModel = require('../models/Job');
var Promise = require('bluebird');

function resetJobs() {
    return new Promise( function(resolve, reject) {
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
};


var connectDB = Promise.promisify(mongoose.connect, mongoose);


describe("get jobs", function() {

    var jobs;

    before(function(done) {
//        connectDB('mongodb://localhost/jobfinder')
        this.timeout(5000);
        connectDB('mongodb://dms:nrg@ds039850.mongolab.com:39850/jobfinder')
            .then(resetJobs)
            .then(jobModel.seedJobs)
            .then(jobModel.findJobs)
            .then(function(collection) {
                jobs = collection;
                done();
            });
    });

    it("should never be empty since jobs are seeded", function() {
        expect(jobs.length).to.be.at.least(1);
    });

    it("should have a job with a title", function() {
        expect(jobs[0].title).to.not.be.empty;
    });
});

