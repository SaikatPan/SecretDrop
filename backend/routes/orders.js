const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const { senderName, receiverName, address, message, giftId } = req.body;

    if (!receiverName || !address || !giftId) {
      return res.status(400).json({
        message: 'Receiver name, address, and gift selection are required',
      });
    }

    const order = new Order({
      senderName: senderName || 'Anonymous',
      receiverName,
      address,
      message: message || '',
      giftId,
    });

    await order.save();

    res.status(201).json({
      message: 'Order placed successfully! 🎁',
      order,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
