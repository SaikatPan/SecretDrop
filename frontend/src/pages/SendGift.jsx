import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../services/api';
import './SendGift.css';

function SendGift() {
  const [searchParams] = useSearchParams();
  const preselectedGift = searchParams.get('gift');

  const [gifts, setGifts] = useState([]);
  const [form, setForm] = useState({
    senderName: '',
    receiverName: '',
    address: '',
    message: '',
    giftId: preselectedGift || '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const res = await API.get('/gifts');
        setGifts(res.data);
      } catch {
        setGifts([
          { _id: '1', name: 'Chocolate Box', price: 24.99 },
          { _id: '2', name: 'Teddy Bear', price: 29.99 },
          { _id: '3', name: 'Flowers Bouquet', price: 39.99 },
          { _id: '4', name: 'Perfume Gift Set', price: 59.99 },
          { _id: '5', name: 'Mystery Box', price: 34.99 },
          { _id: '6', name: 'Custom Message Gift', price: 19.99 },
        ]);
      }
    };
    fetchGifts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.receiverName || !form.address || !form.giftId) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await API.post('/orders', form);
      setStatus({ type: 'success', message: '🎉 Gift order placed successfully! Your secret is safe with us.' });
      setForm({ senderName: '', receiverName: '', address: '', message: '', giftId: '' });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="send-gift-page" id="send-gift-page">
      <div className="container">
        <div className="send-gift-wrapper">
          <div className="send-gift-header">
            <span className="page-icon">🎁</span>
            <h1 className="page-title">Send a Gift</h1>
            <p className="page-subtitle">
              Fill in the details below. We&apos;ll deliver it anonymously!
            </p>
          </div>

          <form className="send-gift-form glass-card" onSubmit={handleSubmit} id="send-gift-form">
            {status.message && (
              <div className={`alert alert-${status.type}`} id="order-status">
                {status.message}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="senderName">Your Name (Optional)</label>
              <input
                type="text"
                id="senderName"
                name="senderName"
                className="form-input"
                placeholder="Stay anonymous or tell us who you are..."
                value={form.senderName}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="receiverName">Receiver Name *</label>
                <input
                  type="text"
                  id="receiverName"
                  name="receiverName"
                  className="form-input"
                  placeholder="Who's the lucky person?"
                  value={form.receiverName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="giftId">Select Gift *</label>
                <select
                  id="giftId"
                  name="giftId"
                  className="form-input"
                  value={form.giftId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose a gift...</option>
                  {gifts.map((gift) => (
                    <option key={gift._id} value={gift._id}>
                      {gift.name} — ${gift.price?.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Delivery Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                className="form-input"
                placeholder="Where should we deliver?"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                className="form-input"
                placeholder="Write something heartfelt... 💌"
                value={form.message}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={loading}
              id="place-order-btn"
            >
              {loading ? '✨ Placing Order...' : '🎁 Place Order'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default SendGift;
