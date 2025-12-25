import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScroll } from '../../context/ScrollContext';
import styles from './Home.module.css';
import GuideSection from './GuideSection';
import AboutSection from './AboutSection';

const Home = () => {
  const { setActiveSection } = useScroll();
  const homeRef = useRef(null);

  useEffect(() => {
    // Set initial active section to home
    setActiveSection('home');
  }, [setActiveSection]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection('home');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (homeRef.current) {
      observer.observe(homeRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [setActiveSection]);

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section id="home" ref={homeRef} className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroIcon}>
            <i className="fas fa-shield-alt"></i>
          </div>
          <h1 className={styles.heroTitle}>
            Advanced <span className={styles.highlight}>Cryptography</span> System
          </h1>
          <p className={styles.heroSubtitle}>
            Secure your data with state-of-the-art encryption algorithms. 
            From classical ciphers to modern hybrid cryptosystems.
          </p>
          <div className={styles.heroButtons}>
            <Link to="/encryption" className={styles.primaryButton}>
              <i className="fas fa-lock"></i>
              Start Encrypting
            </Link>
            <Link to="/about" className={styles.secondaryButton}>
              <i className="fas fa-info-circle"></i>
              Learn More
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.imageContainer}>
            <img 
              src="https://lirp.cdn-website.com/35fcf6c5/dms3rep/multi/opt/cybersecurity+project+management-640w.png" 
              alt="Cybersecurity and Cryptography System" 
              className={styles.heroImage}
            />
            <div className={styles.imageOverlay}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Powerful Features</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <i className="fas fa-key"></i>
            </div>
            <h3>Multiple Ciphers</h3>
            <p>Caesar, Hill, Vigenère, DES, and Playfair ciphers for all your encryption needs.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <i className="fas fa-history"></i>
            </div>
            <h3>Operation History</h3>
            <p>Track all your encryption and decryption operations with detailed logs.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Security Analysis</h3>
            <p>Analyze encryption strength with entropy and avalanche effect metrics.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Hybrid System</h3>
            <p>Combine DES and RSA for maximum security and performance.</p>
          </div>
        </div>
      </section>

      {/* Algorithms Section */}
      <section className={styles.algorithms}>
        <h2 className={styles.sectionTitle}>Supported Algorithms</h2>
        <div className={styles.algorithmGrid}>
          <div className={styles.algorithmCard}>
            <div className={styles.algorithmHeader}>
              <i className="fas fa-code"></i>
              <h3>Classical Ciphers</h3>
            </div>
            <ul className={styles.algorithmList}>
              <li><i className="fas fa-check"></i> Caesar Cipher</li>
              <li><i className="fas fa-check"></i> Hill Cipher</li>
              <li><i className="fas fa-check"></i> Vigenère Cipher</li>
              <li><i className="fas fa-check"></i> Playfair Cipher</li>
            </ul>
          </div>
          <div className={styles.algorithmCard}>
            <div className={styles.algorithmHeader}>
              <i className="fas fa-lock"></i>
              <h3>Modern Ciphers</h3>
            </div>
            <ul className={styles.algorithmList}>
              <li><i className="fas fa-check"></i> DES (Data Encryption Standard)</li>
              <li><i className="fas fa-check"></i> RSA (Rivest-Shamir-Adleman)</li>
              <li><i className="fas fa-check"></i> Hybrid DES + RSA</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Ready to Secure Your Data?</h2>
          <p>Start using our advanced cryptography system today</p>
          <Link to="/encryption" className={styles.ctaButton}>
            <i className="fas fa-rocket"></i>
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Guide Section */}
      <GuideSection />

      {/* About Section */}
      <AboutSection />
    </div>
  );
};

export default Home;

