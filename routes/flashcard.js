const express = require('express');
const flashcard = require('../models/flashcard.js');

const router = express.Router();

// index
router.get('/', (req, res, next) => {
  flashcard.all((err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// get all cards in a deck
router.get('/deck/:id', (req, res, next) => {
  flashcard.deck(req.params.id, (err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// show
router.get('/:id', (req, res, next) => {
  flashcard.get(req.params.id, (err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// new
router.post('/', (req, res, next) => {
  flashcard.new(
    req.body.kanji,
    req.body.reading,
    req.body.pos,
    req.body.gloss,
    req.body.deckId,
    (err) => {
      if (err) return next(err);
      res.json({ success: true });
    }
  );
});

// update
router.put('/:id', (req, res, next) => {
  flashcard.update(
    req.params.id,
    req.body.kanji,
    req.body.reading,
    req.body.pos,
    req.body.gloss,
    req.body.deckId,
    (err) => {
      if (err) return next(err);
      res.json({ success: true });
    }
  );
});

// delete
router.delete('/:id', (req, res, next) => {
  flashcard.delete(req.params.id, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

module.exports = router;// index
