import Hero from '../components/Hero';
import GiftCatalog from '../components/GiftCatalog';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

function Home() {
  return (
    <main id="home-page">
      <Hero />
      <GiftCatalog />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </main>
  );
}

export default Home;
