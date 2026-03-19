const mongoose = require('mongoose');
require('dotenv').config();
const Gift = require('./models/Gift');

const gifts = [
  {
    name: 'Chocolate Box',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=300&fit=crop',
  },
  {
    name: 'Teddy Bear',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=400&h=300&fit=crop',
  },
  {
    name: 'Flowers Bouquet',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=300&fit=crop',
  },
  {
    name: 'Perfume Gift Set',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop',
  },
  {
    name: 'Mystery Box',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=300&fit=crop',
  },
  {
    name: 'Custom Message Gift',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400&h=300&fit=crop',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Gift.deleteMany({});
    console.log('Cleared existing gifts');

    await Gift.insertMany(gifts);
    console.log('✅ Seeded 6 gifts successfully');

    await mongoose.connection.close();
    console.log('Connection closed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
