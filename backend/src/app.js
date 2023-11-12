const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require("body-parser");
const corsOptions = require('./config/cors');

require('dotenv').config();
require("./auth/passport")

const middlewares = require('./middlewares');
const routes = require('./routes/routes')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cors(corsOptions));


//app.use('/api/v1', api);
app.use('/', routes);


app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
