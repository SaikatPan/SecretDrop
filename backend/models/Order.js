const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  senderName: {
    type: String,
    default: 'Anonymous',
    trim: true,
  },
  receiverName: {
    type: String,
    required: [true, 'Receiver name is required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Delivery address is required'],
    trim: true,
  },
  message: {
    type: String,
    default: '',
    trim: true,
  },
  giftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gift',
    required: [true, 'Gift selection is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
