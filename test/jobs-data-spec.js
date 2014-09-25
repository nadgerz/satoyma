var expect = require("chai").expect;

mongoose.connect('mongodb://dms:nrg@ds039850.mongolab.com:39850/jobfinder');

describe("get jobs", function() {
    jobsList = [];
    it("should never be empty since jobs are seeded", function() {
        mongoose.model('Job').find({}).exec(function(error, collection) {
            expect(jobsList.length).to.be.at.least(1);
        })
    });
});

