var expect = require("chai").expect;
var mongoose = require('mongoose');
var jobModel = require('../models/Job');

function resetJobs(callback) {
    mongoose.connection.collections['jobs'].drop(callback);
};

describe("get jobs", function() {
    it("should never be empty since jobs are seeded", function(done) {
        mongoose.connect('mongodb://dms:nrg@ds039850.mongolab.com:39850/jobfinder', function() {
            resetJobs(function() {
                mongoose.model('Job').find({}).exec(function(error, jobsList) {
                    expect(jobsList.length).to.be.at.least(1);
                    done();
                });
            });
        });
    });
});

