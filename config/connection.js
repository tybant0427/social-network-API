const { connect, connection } = require('mongoose');


connect('mongodb://localhost/socia-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('mongoDB connected'))
    .catch(err => console.log(err));
module.exports = connection;
