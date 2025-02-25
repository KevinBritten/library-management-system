import materialRouter from "./routes/materials.js";
import customerRouter from "./routes/customers.js";
import userRouter from "./routes/users.js";
import cors from "cors";

// var createError = require('http-errors');
// var express = require("express");
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

import express from "express";

var app = express();

// app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use("/material", materialRouter);
app.use("/customer", customerRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
