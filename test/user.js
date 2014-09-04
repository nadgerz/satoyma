var user = require('../lib/customers');

describe("Users", function(){  
  it("retrieves by email", function(done){    
    user.findByEmail('test@test.com', function(doc){      
      doc.email.should.equal('test@test.com');       
      done();    
    });  
  });
});
