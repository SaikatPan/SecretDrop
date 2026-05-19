import { useState, useEffect } from 'react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    text: "SecretDrop made my friend's birthday so special! She had no idea who sent the flowers and she loved the mystery.",
    author: 'Priya M.',
    role: 'Gifter',
    rating: 5,
    emoji: '🌸',
  },
  {
    id: 2,
    text: "I received a mystery box from an anonymous sender and it absolutely made my week. Such a thoughtful concept!",
    author: 'Arjun K.',
    role: 'Receiver',
    rating: 5,
    emoji: '📦',
  },
  {
    id: 3,
    text: "The whole process was seamless. Chose a gift, added a message, and it was delivered secretly. Pure magic!",
    author: 'Sarah L.',
    role: 'Gifter',
    rating: 5,
    emoji: '✨',
  },
  {
    id: 4,
    text: "Love how easy it is to surprise someone without them knowing. The anonymity feature is perfectly executed.",
    author: 'Rahul S.',
    role: 'Gifter',
    rating: 5,
    emoji: '🎁',
  },
];

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="testimonials" id="testimonials-section">
      <div className="container">
        <h2 className="section-title">
          <span className="gradient-text">What People Say</span>
        </h2>
        <p className="section-subtitle">Real stories from our gifters and receivers</p>

        <div className="testimonials-carousel">
          <div className="testimonials-track">
            {testimonials.map((t, index) => (
              <div
                key={t.id}
                className={`testimonial-card ${index === activeIndex ? 'active' : ''}`}
                id={`testimonial-${t.id}`}
              >
                <div className="testimonial-emoji">{t.emoji}</div>
                <div className="testimonial-stars">
                  {'★'.repeat(t.rating)}
                </div>
                <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
                <div className="testimonial-author">
                  <span className="author-name">{t.author}</span>
                  <span className="author-role">{t.role}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonials-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
