const env = require('dotenv').config();

module.exports = {
    mongodbURL: process.env.MONGODB_URI || "mongodb://localhost/gateway"
}