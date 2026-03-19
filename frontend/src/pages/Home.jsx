import Hero from '../components/Hero';
import GiftCatalog from '../components/GiftCatalog';
import HowItWorks from '../components/HowItWorks';

function Home() {
  return (
    <main id="home-page">
      <Hero />
      <GiftCatalog />
      <HowItWorks />
    </main>
  );
}

export default Home;
