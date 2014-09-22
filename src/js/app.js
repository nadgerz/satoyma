var utils = require('./utils');

// Before any of the relevant routes...
app.use('/api-requiring-auth', utils.basicAuth('username', 'password'));


var auth = require('basic-auth');
var user = auth(req);
// => { name: 'something', pass: 'whatever' }

