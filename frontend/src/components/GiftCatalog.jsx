import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import './GiftCatalog.css';

const categories = ['All', 'Popular', 'Classic', 'Premium', 'Fun'];

const fallbackGifts = [
  { _id: '1', name: 'Chocolate Box', price: 24.99, category: 'Classic', badge: 'Popular', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=300&fit=crop' },
  { _id: '2', name: 'Teddy Bear', price: 29.99, category: 'Classic', badge: null, image: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=400&h=300&fit=crop' },
  { _id: '3', name: 'Flowers Bouquet', price: 39.99, category: 'Premium', badge: 'New', image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=300&fit=crop' },
  { _id: '4', name: 'Perfume Gift Set', price: 59.99, category: 'Premium', badge: 'Popular', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop' },
  { _id: '5', name: 'Mystery Box', price: 34.99, category: 'Fun', badge: 'New', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=300&fit=crop' },
  { _id: '6', name: 'Custom Message Gift', price: 19.99, category: 'Fun', badge: null, image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400&h=300&fit=crop' },
];

function GiftCatalog() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [wishlist, setWishlist] = useState(new Set());
  const [visibleCards, setVisibleCards] = useState(new Set());
  const gridRef = useRef(null);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const res = await API.get('/gifts');
        // Add category/badge if not present from backend
        const enriched = res.data.map((g, i) => ({
          ...g,
          category: g.category || fallbackGifts[i % fallbackGifts.length].category,
          badge: g.badge || fallbackGifts[i % fallbackGifts.length].badge,
        }));
        setGifts(enriched);
      } catch {
        setGifts(fallbackGifts);
      } finally {
        setLoading(false);
      }
    };
    fetchGifts();
  }, []);

  // Intersection observer for scroll-triggered reveal
  useEffect(() => {
    if (loading || !gridRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, entry.target.dataset.id]));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    const cards = gridRef.current.querySelectorAll('.gift-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [loading, gifts, activeCategory]);

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredGifts = activeCategory === 'All'
    ? gifts
    : activeCategory === 'Popular'
      ? gifts.filter(g => g.badge === 'Popular')
      : gifts.filter(g => g.category === activeCategory);

  if (loading) {
    return (
      <section className="gift-catalog" id="gift-catalog">
        <div className="container">
          <h2 className="section-title">🎁 Our Gift Collection</h2>
          <p className="section-subtitle">Choose from our curated selection of anonymous gifts</p>
          <div className="gift-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="gift-card-skeleton">
                <div className="skeleton-img"></div>
                <div className="skeleton-body">
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text short"></div>
                  <div className="skeleton-btn"></div>
                </div>
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
        <h2 className="section-title">
          <span className="gradient-text">Our Gift Collection</span>
        </h2>
        <p className="section-subtitle">Choose from our curated selection of anonymous gifts</p>

        {/* Category filter pills */}
        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCards(new Set());
              }}
              id={`filter-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="gift-grid" ref={gridRef}>
          {filteredGifts.map((gift, index) => (
            <div
              key={gift._id}
              className={`gift-card ${visibleCards.has(gift._id) ? 'visible' : ''}`}
              data-id={gift._id}
              style={{ '--delay': `${index * 0.08}s` }}
              id={`gift-card-${gift._id}`}
            >
              <div className="gift-image-wrapper">
                <img src={gift.image} alt={gift.name} className="gift-image" loading="lazy" />
                <div className="gift-image-overlay"></div>

                {gift.badge && (
                  <span className={`gift-tag gift-tag--${gift.badge.toLowerCase()}`}>
                    {gift.badge}
                  </span>
                )}

                <button
                  className={`wishlist-btn ${wishlist.has(gift._id) ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); toggleWishlist(gift._id); }}
                  aria-label={wishlist.has(gift._id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {wishlist.has(gift._id) ? '❤️' : '🤍'}
                </button>
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

        {filteredGifts.length === 0 && (
          <div className="no-gifts">
            <span className="no-gifts-icon">🔍</span>
            <p>No gifts found in this category</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default GiftCatalog;
