import './HowItWorks.css';

const steps = [
  {
    icon: '🎁',
    title: 'Choose a Gift',
    description: 'Browse our curated collection and pick the perfect anonymous gift for someone special.',
    color: '#fce4ec',
    accent: '#f8a4b8',
  },
  {
    icon: '📝',
    title: 'Enter Receiver Details',
    description: 'Tell us who should receive the gift. Add a heartfelt message — your identity stays secret!',
    color: '#f3e5f5',
    accent: '#b491c8',
  },
  {
    icon: '🚀',
    title: 'We Deliver It Anonymously',
    description: 'Sit back and relax. We handle the delivery — no one will know it was you!',
    color: '#e1f5fe',
    accent: '#89bff8',
  },
];

function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works-section">
      <div className="container">
        <h2 className="section-title">✨ How It Works</h2>
        <p className="section-subtitle">Sending anonymous gifts has never been easier</p>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-card"
              style={{
                '--step-bg': step.color,
                '--step-accent': step.accent,
                animationDelay: `${index * 0.15}s`,
              }}
              id={`step-card-${index + 1}`}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Connector line */}
        <div className="steps-connector">
          <div className="connector-line"></div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
