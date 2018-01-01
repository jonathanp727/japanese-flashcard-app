const jwt = require('jsonwebtoken');

module.exports = {

  // route middleware to verify a token
  authenticate(req, res, next) {
    const token = req.body.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          const error = new Error('Failed to authenticate token');
          error.status = 401;
          next(error);
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      const error = new Error('No token provided');
      error.status = 403;
      next(error);
    }
  },
  setHeaders(req, res, next) {
    // Websites allowed to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    // Allowed methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Allowed headers
    res.setHeader('Access-Control-Allow-Headers', 'x-access-token, content-type');
    next();
  }
};
