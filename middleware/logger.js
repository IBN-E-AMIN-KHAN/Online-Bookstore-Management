// Logs every incoming request's method, endpoint, and date/time
const requestLogger = (req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = requestLogger;
