const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
var path = require('path');
const GatewayRoutes = require('./routes/gateway.routes');
const PeripheralRoutes = require('./routes/peripheral.routes');

const app = express();

// settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//middlewares
app.use(cors());
app.use(morgan('dev'))
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.render('index');
});
app.use('/api/gateway', GatewayRoutes);
app.use('/api/peripheral', PeripheralRoutes);

module.exports = app;