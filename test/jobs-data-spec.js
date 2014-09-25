describe("get jobs", function() {
    jobsList = [];
    it("should never be empty since jobs are seeded", function() {
        expect(jobsList.length).to.be.at.least(1);
    });
});

