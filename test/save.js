var User = function(name) {
    this.name = name;

    this.save = function(cb) {
//        console.log("Saved");
        cb();
    }
}

describe('User', function () {
    describe('#save()', function () {
        it('should save without error', function (done) {
            var user = new User('Luna');
            user.save(function (err) {
                if (err) throw err;
                done();
            });
        })
    }),
    describe('#save2()', function () {
        it('should save without error', function (done) {
            var user = new User('Luna');
            user.save(done);
        })
    })
})
