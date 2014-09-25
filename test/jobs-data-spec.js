var expect = require("chai").expect;
var mongoose = require('mongoose');

mongoose.connect('mongodb://dms:nrg@ds039850.mongolab.com:39850/jobfinder');

describe("get jobs", function() {
    it("should never be empty since jobs are seeded", function() {
        mongoose.model('Job').find({}).exec(function(error, jobsList) {
            expect(jobsList.length).to.be.at.least(1);
        })
    });
});

