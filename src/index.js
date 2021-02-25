const app = require('./app');
const { database } = require('./database');

app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
})

module.exports = app;