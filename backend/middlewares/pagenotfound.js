const Sentry = require("@sentry/node");

const pageNotFound = (req, res, next) => {
  res.status(404);

  // Sentry.captureEvent(err)
  next(new Error(`Requested Page is not found ${req.originalUrl}`));
};

const errorHandle = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);
  Sentry.captureMessage(err.message);
  if (!res.headersSent) {
    res
      .json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
      })
      .end();
  }
};

module.exports = { pageNotFound, errorHandle };
