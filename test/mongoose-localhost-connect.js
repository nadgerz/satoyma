/**
 * Created by si on 04/09/14.
 */
var mongoose = require('mongoose');

describe('Connect to database', function(){
    describe('connect', function(){
        it('should connect', function(done){
            mongoose.connect('mongodb://localhost/test');
            done();
        })
    })
})