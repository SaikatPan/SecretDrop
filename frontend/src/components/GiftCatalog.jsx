import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import './GiftCatalog.css';

function GiftCatalog() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const res = await API.get('/gifts');
        setGifts(res.data);
      } catch (err) {
        console.error('Failed to fetch gifts:', err);
        // Fallback with sample data if backend unavailable
        setGifts([
          { _id: '1', name: 'Chocolate Box', price: 24.99, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=300&fit=crop' },
          { _id: '2', name: 'Teddy Bear', price: 29.99, image: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=400&h=300&fit=crop' },
          { _id: '3', name: 'Flowers Bouquet', price: 39.99, image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=300&fit=crop' },
          { _id: '4', name: 'Perfume Gift Set', price: 59.99, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop' },
          { _id: '5', name: 'Mystery Box', price: 34.99, image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=300&fit=crop' },
          { _id: '6', name: 'Custom Message Gift', price: 19.99, image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400&h=300&fit=crop' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchGifts();
  }, []);

  if (loading) {
    return (
      <section className="gift-catalog" id="gift-catalog">
        <div className="container">
          <h2 className="section-title">🎁 Our Gift Collection</h2>
          <p className="section-subtitle">Choose from our curated selection of anonymous gifts</p>
          <div className="gift-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="gift-card-skeleton glass-card">
                <div className="skeleton-img"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text short"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="gift-catalog" id="gift-catalog">
      <div className="container">
        <h2 className="section-title">🎁 Our Gift Collection</h2>
        <p className="section-subtitle">Choose from our curated selection of anonymous gifts</p>
        <div className="gift-grid">
          {gifts.map((gift, index) => (
            <div
              key={gift._id}
              className="gift-card glass-card"
              style={{ animationDelay: `${index * 0.1}s` }}
              id={`gift-card-${gift._id}`}
            >
              <div className="gift-image-wrapper">
                <img src={gift.image} alt={gift.name} className="gift-image" loading="lazy" />
                <div className="gift-badge">${gift.price.toFixed(2)}</div>
              </div>
              <div className="gift-info">
                <h3 className="gift-name">{gift.name}</h3>
                <p className="gift-price">${gift.price.toFixed(2)}</p>
                <Link
                  to={`/send-gift?gift=${gift._id}`}
                  className="btn btn-primary gift-btn"
                  id={`send-anon-${gift._id}`}
                >
                  🎀 Send Anonymously
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GiftCatalog;
