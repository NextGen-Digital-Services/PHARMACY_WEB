import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ShieldCheck, Heart, Award, ArrowUp } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer bg-teal-dark">
      <div className="container footer-container">
        {/* Column 1: Brand Info */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">
            <span className="logo-icon">+</span>
            <span className="logo-text">VitaDerm</span>
          </Link>
          <p className="footer-desc">
            Certified pharmaceutical-grade Dermatology & Nutrition e-commerce platform. Delivering clinically-validated formulas for skincare and nutritional health.
          </p>
          <div className="trust-seals">
            <div className="seal">
              <ShieldCheck size={18} className="seal-icon" />
              <span>WHO-GMP Certified</span>
            </div>
            <div className="seal">
              <Award size={18} className="seal-icon" />
              <span>Lab Tested</span>
            </div>
          </div>
        </div>

        {/* Column 2: Shop Links */}
        <div className="footer-col">
          <h4 className="footer-title">Dermatology</h4>
          <ul className="footer-links">
            <li><Link to="/shop/face-cleansers">Face Cleansers</Link></li>
            <li><Link to="/shop/moisturizers-creams">Moisturizers & Creams</Link></li>
            <li><Link to="/shop/sunscreens">Sunscreens</Link></li>
            <li><Link to="/shop/serums-actives">Serums & Actives</Link></li>
            <li><Link to="/shop/acne-blemish-care">Acne & Blemish Care</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Care */}
        <div className="footer-col">
          <h4 className="footer-title">Nutrition & Support</h4>
          <ul className="footer-links">
            <li><Link to="/shop/vitamins-minerals">Vitamins & Minerals</Link></li>
            <li><Link to="/shop/protein-fitness">Protein & Fitness</Link></li>
            <li><Link to="/shop/wellness-herbal">Wellness & Herbal</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="footer-col newsletter-col">
          <h4 className="footer-title">Subscribe to Wellness</h4>
          <p className="newsletter-desc">Join 10,000+ subscribers to receive pharmacist-curated health guides and exclusive discounts.</p>
          {subscribed ? (
            <div className="newsletter-success">
              <p>✓ Subscribed! Thank you for joining VitaDerm.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <hr className="footer-divider" />

      {/* Bottom Bar */}
      <div className="container footer-bottom">
        <div className="copyright">
          © {new Date().getFullYear()} VitaDerm. Formulated with <Heart size={12} className="heart-icon" /> by Google Deepmind. All rights reserved.
        </div>
        <div className="payment-icons">
          <span className="payment-text text-mono">SECURE GATEWAY PARTNERS:</span>
          <span className="pay-method text-mono">UPI</span>
          <span className="pay-method text-mono">VISA</span>
          <span className="pay-method text-mono">MASTERCARD</span>
          <span className="pay-method text-mono">COD</span>
        </div>
        <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
