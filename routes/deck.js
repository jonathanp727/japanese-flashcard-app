const express = require('express');
const deck = require('../models/deck.js');

const router = express.Router();

// index
router.get('/', (req, res, next) => {
  deck.all((err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// get all decks for a user
router.get('/user/:id', (req, res, next) => {
  deck.user(req.params.id, (err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// show
router.get('/:id', (req, res, next) => {
  deck.get(req.params.id, (err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// new
router.post('/', (req, res, next) => {
  deck.new(req.body.name, req.body.userId, (err, result) => {
    if (err) return next(err);
    res.json({ id: result.insertId });
  });
});

// update
router.put('/:id', (req, res, next) => {
  deck.update(req.params.id, req.body.name, req.body.userId, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

// delete
router.delete('/:id', (req, res, next) => {
  deck.delete(req.params.id, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

module.exports = router;
