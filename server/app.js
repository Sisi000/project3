const createError = require('http-errors');
const cors = require ('cors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const bodyParser = require("body-parser")

const indexRouter = require('./routes/index');
const s3Router = require('./routes/s3');
const productRouter = require ('./routes/productRoutes.js');
const userRouter = require ('./routes/userRoutes.js');
const orderRouter = require ('./routes/orderRoutes.js');
const prescriptionRouter = require ('./routes/prescriptionRoutes.js');

const app = express();

/* Not using options, letting everything through
const corsOptions = {
  //origin: process.env.FRONT_END_URL,
  credentials:  true,
  origin: true
}
*/

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.use('/', indexRouter);
app.use('/', s3Router);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/prescriptions', prescriptionRouter);

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
