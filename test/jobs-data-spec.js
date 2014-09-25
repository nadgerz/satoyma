var expect = require("chai").expect;
var mongoose = require('mongoose');
var jobModel = require('../models/Job');
var Promise = require('bluebird');
var jobsData = require('../jobs-data.js');

function resetJobs() {
    return new Promise( function(resolve, reject) {
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
};


describe("get jobs", function() {

    var jobs;
    var db_url = 'mongodb://localhost/jobfinder';
    db_url = 'mongodb://dms:nrg@ds039850.mongolab.com:39850/jobfinder';

    before(function(done) {
        this.timeout(5000);
        jobsData.connectDB(db_url)
            .then(resetJobs)
            .then(jobModel.seedJobs)
            .then(jobsData.findJobs)
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

    it("should have a job with a description", function() {
        expect(jobs[0].description).to.not.be.empty;
    });
});

