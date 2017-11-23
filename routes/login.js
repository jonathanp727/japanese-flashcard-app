const jwt = require('jsonwebtoken');
const express = require('express');

const dbUtil = require('../helpers/dbUtil.js');
const cryptoUtil = require('../helpers/cryptoUtil.js');

const router = express.Router();

router.post('/', (req, res, next) => {
  dbUtil.getDb().query(`SELECT * FROM users WHERE username="${req.body.username}"`, (err, result) => {
    if (err) return next(err);
    const user = result[0];
    if (!user) {
      const error = new Error('Authentication failed. User not found.');
      error.status = 401;
      return next(error);
    }
    const hashResult = cryptoUtil.getHashFromSalt(req.body.password, user.salt);
    if (user.password !== hashResult) {
      const error = new Error('Authentication failed. User not found.');
      error.status = 401;
      return next(error);
    }
    const token = jwt.sign({ user }, process.env.JWT_KEY);
    res.json({ success: true, message: 'Authenticated', token });
  });
});

module.exports = router;
