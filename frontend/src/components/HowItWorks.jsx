import { useEffect, useRef, useState } from 'react';
import './HowItWorks.css';

const steps = [
  {
    icon: '🎁',
    title: 'Choose a Gift',
    description: 'Browse our curated collection and pick the perfect anonymous gift for someone special.',
    color: 'var(--pink)',
    accent: 'var(--pink-deep)',
  },
  {
    icon: '📝',
    title: 'Enter Receiver Details',
    description: 'Tell us who should receive the gift. Add a heartfelt message — your identity stays secret!',
    color: 'var(--lavender)',
    accent: 'var(--violet)',
  },
  {
    icon: '🚀',
    title: 'We Deliver It Anonymously',
    description: 'Sit back and relax. We handle the delivery — no one will know it was you!',
    color: 'var(--sky)',
    accent: 'var(--sky-deep)',
  },
];

function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState(new Set());
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => new Set([...prev, entry.target.dataset.step]));
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -60px 0px' }
    );

    const cards = sectionRef.current?.querySelectorAll('.step-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="how-it-works" id="how-it-works-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">
          <span className="gradient-text">How It Works</span>
        </h2>
        <p className="section-subtitle">Sending anonymous gifts has never been easier</p>

        <div className="steps-container">
          {/* Timeline connector */}
          <div className="timeline-line" aria-hidden="true">
            <div
              className="timeline-progress"
              style={{
                height: visibleSteps.size === 3 ? '100%' :
                  visibleSteps.size === 2 ? '66%' :
                    visibleSteps.size === 1 ? '33%' : '0%'
              }}
            ></div>
          </div>

          <div className="steps-grid">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`step-card ${visibleSteps.has(String(index)) ? 'visible' : ''}`}
                data-step={index}
                style={{
                  '--step-color': step.color,
                  '--step-accent': step.accent,
                  '--delay': `${index * 0.2}s`,
                }}
                id={`step-card-${index + 1}`}
              >
                <div className="step-number-ring">
                  <span className="step-number">{index + 1}</span>
                </div>
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
