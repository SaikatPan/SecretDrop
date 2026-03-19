import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gifts from './pages/Gifts';
import HowItWorksPage from './pages/HowItWorksPage';
import SendGift from './pages/SendGift';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gifts" element={<Gifts />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/send-gift" element={<SendGift />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
