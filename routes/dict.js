const express = require('express');
const dict = require('../models/dict');

const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.query.j) {
    dict.jToE(req.query.j, (err, result) => {
      if (err) next(err);
      res.json(result);
    });
  } else {
    dict.eToJ(req.query.e, (err, result) => {
      if (err) next(err);
      res.json(result);
    });
  }
});

module.exports = router;
