const express = require('express');

const router = express.Router();
const middlewares = require('../middlewares.js');

router.use('/join', require('./join'));
router.use('/login', require('./login'));

router.use(middlewares.authenticate);

router.use('/user', require('./user'));
router.use('/dict', require('./dict'));
router.use('/deck', require('./deck'));
router.use('/flashcard', require('./flashcard'));

router.get('/', (req, res) => {
  res.json({ success: true });
});

module.exports = router;
