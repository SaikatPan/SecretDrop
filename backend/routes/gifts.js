const express = require('express');
const Gift = require('../models/Gift');

const router = express.Router();

// GET /api/gifts
router.get('/', async (req, res) => {
  try {
    const gifts = await Gift.find();
    res.json(gifts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
