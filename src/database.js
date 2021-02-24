const mongoose = require('mongoose');
const config = require('./config');

(async () => {
    try {
        const db = await mongoose.connect(config.mongodbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('Database is connected to: ', db.connection.name)
    } catch (error) {
        console.error(error);
    }
})();