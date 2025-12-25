import React, { useEffect, useRef } from 'react';
import { useScroll } from '../../context/ScrollContext';
import aboutStyles from '../About/About.module.css';
import styles from './Home.module.css';

const AboutSection = () => {
  const { setActiveSection } = useScroll();
  const aboutRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection('about');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [setActiveSection]);

  return (
    <section className={styles.sectionWrapper} id="about" ref={aboutRef}>
      <div className={styles.sectionContainer}>
      <div className={aboutStyles.header}>
        <div className={aboutStyles.headerIcon}>
          <i className="fas fa-info-circle"></i>
        </div>
        <h1>About Cryptography System</h1>
        <p className={aboutStyles.subtitle}>Advanced encryption solutions for modern security needs</p>
      </div>

      <div className={aboutStyles.content}>
        <section className={aboutStyles.section}>
          <h2 className={aboutStyles.sectionTitle}>
            <i className="fas fa-shield-alt"></i>
            What is Cryptography?
          </h2>
          <div className={aboutStyles.textContent}>
            <p>
              Cryptography is the practice and study of techniques for secure communication 
              in the presence of adversarial behavior. It involves creating and analyzing 
              protocols that prevent third parties or the public from reading private messages.
            </p>
            <p>
              Our Cryptography System provides a comprehensive platform for encrypting and 
              decrypting data using various classical and modern cryptographic algorithms. 
              Whether you're learning about cryptography or need to secure sensitive information, 
              our system offers the tools you need.
            </p>
          </div>
        </section>

        <section className={aboutStyles.section}>
          <h2 className={aboutStyles.sectionTitle}>
            <i className="fas fa-key"></i>
            Supported Algorithms
          </h2>
          <div className={aboutStyles.algorithmGrid}>
            <div className={aboutStyles.algorithmBox}>
              <h3>Caesar Cipher</h3>
              <p>
                One of the simplest and most widely known encryption techniques. 
                Each letter in the plaintext is shifted a certain number of places 
                down the alphabet.
              </p>
            </div>
            <div className={aboutStyles.algorithmBox}>
              <h3>Hill Cipher</h3>
              <p>
                A polygraphic substitution cipher based on linear algebra. 
                Uses matrix multiplication to encrypt pairs of letters.
              </p>
            </div>
            <div className={aboutStyles.algorithmBox}>
              <h3>Vigenère Cipher</h3>
              <p>
                A method of encrypting alphabetic text using a simple form of 
                polyalphabetic substitution. More secure than Caesar cipher.
              </p>
            </div>
            <div className={aboutStyles.algorithmBox}>
              <h3>Playfair Cipher</h3>
              <p>
                A manual symmetric encryption technique using a 5x5 grid of letters. 
                Encrypts pairs of letters (digraphs) instead of single letters.
              </p>
            </div>
            <div className={aboutStyles.algorithmBox}>
              <h3>DES</h3>
              <p>
                Data Encryption Standard - a symmetric-key algorithm for encryption 
                of electronic data. Fast and efficient for bulk encryption.
              </p>
            </div>
            <div className={aboutStyles.algorithmBox}>
              <h3>RSA</h3>
              <p>
                Rivest-Shamir-Adleman - a public-key cryptosystem widely used for 
                secure data transmission. Used in our hybrid system for key exchange.
              </p>
            </div>
          </div>
        </section>

        <section className={aboutStyles.section}>
          <h2 className={aboutStyles.sectionTitle}>
            <i className="fas fa-chart-line"></i>
            Features
          </h2>
          <div className={aboutStyles.featuresList}>
            <div className={aboutStyles.featureItem}>
              <i className="fas fa-check-circle"></i>
              <div>
                <h4>Real-time Encryption/Decryption</h4>
                <p>Encrypt and decrypt data instantly with multiple cipher algorithms</p>
              </div>
            </div>
            <div className={aboutStyles.featureItem}>
              <i className="fas fa-check-circle"></i>
              <div>
                <h4>Operation History</h4>
                <p>Track all your cryptographic operations with timestamps and details</p>
              </div>
            </div>
            <div className={aboutStyles.featureItem}>
              <i className="fas fa-check-circle"></i>
              <div>
                <h4>Security Analysis</h4>
                <p>Analyze encryption strength using entropy and avalanche effect metrics</p>
              </div>
            </div>
            <div className={aboutStyles.featureItem}>
              <i className="fas fa-check-circle"></i>
              <div>
                <h4>Hybrid Cryptosystem</h4>
                <p>Combine DES and RSA for optimal security and performance</p>
              </div>
            </div>
            <div className={aboutStyles.featureItem}>
              <i className="fas fa-check-circle"></i>
              <div>
                <h4>User-Friendly Interface</h4>
                <p>Intuitive design with professional dark theme and neon accents</p>
              </div>
            </div>
            <div className={aboutStyles.featureItem}>
              <i className="fas fa-check-circle"></i>
              <div>
                <h4>Educational Tool</h4>
                <p>Learn about different cryptographic algorithms and their applications</p>
              </div>
            </div>
          </div>
        </section>

        <section className={aboutStyles.section}>
          <h2 className={aboutStyles.sectionTitle}>
            <i className="fas fa-lock"></i>
            Security & Privacy
          </h2>
          <div className={aboutStyles.textContent}>
            <p>
              All encryption and decryption operations are performed locally in your browser. 
              No data is sent to external servers, ensuring complete privacy and security 
              of your information.
            </p>
            <p>
              The system uses industry-standard cryptographic libraries and follows best 
              practices for secure data handling. However, please note that this is an 
              educational tool and should not be used for highly sensitive real-world 
              applications without proper security audits.
            </p>
          </div>
        </section>
      </div>
      </div>
    </section>
  );
};

export default AboutSection;

