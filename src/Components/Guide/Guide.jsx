import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Guide.module.css';

const Guide = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <i className="fas fa-book"></i>
        </div>
        <h1>User Guide</h1>
        <p className={styles.subtitle}>Learn how to use the Cryptography System</p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <i className="fas fa-play-circle"></i>
            Getting Started
          </h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3>Navigate to Encryption</h3>
                <p>Click on the "Encryption" tab in the navigation bar or use the "Start Encrypting" button on the home page.</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3>Select a Cipher</h3>
                <p>Choose from available ciphers: Caesar, Hill, Vigenère, DES, or Playfair from the dropdown menu.</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3>Enter Your Data</h3>
                <p>Type or paste your plaintext in the input field. Enter the encryption key according to the cipher requirements.</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h3>Encrypt or Decrypt</h3>
                <p>Click the "Encrypt" button to encrypt your data, or "Decrypt" to decrypt ciphertext. Results appear instantly.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <i className="fas fa-key"></i>
            Cipher-Specific Instructions
          </h2>
          <div className={styles.instructions}>
            <div className={styles.instructionCard}>
              <h3>Caesar Cipher</h3>
              <ul>
                <li>Key: A single number (e.g., 3, 5, 13)</li>
                <li>Each letter is shifted by the key number</li>
                <li>Example: "HELLO" with key 3 becomes "KHOOR"</li>
              </ul>
            </div>
            <div className={styles.instructionCard}>
              <h3>Hill Cipher</h3>
              <ul>
                <li>Key: 4 numbers separated by spaces (e.g., "3 3 2 5")</li>
                <li>Forms a 2x2 matrix for encryption</li>
                <li>Key must have a non-zero determinant</li>
              </ul>
            </div>
            <div className={styles.instructionCard}>
              <h3>Vigenère Cipher</h3>
              <ul>
                <li>Key: Letters only (e.g., "KEY", "PASSWORD")</li>
                <li>Uses a keyword to apply multiple Caesar shifts</li>
                <li>More secure than simple Caesar cipher</li>
              </ul>
            </div>
            <div className={styles.instructionCard}>
              <h3>Playfair Cipher</h3>
              <ul>
                <li>Key: A word or phrase (e.g., "MONARCHY")</li>
                <li>Creates a 5x5 matrix from the key</li>
                <li>Encrypts pairs of letters (digraphs)</li>
              </ul>
            </div>
            <div className={styles.instructionCard}>
              <h3>DES Cipher</h3>
              <ul>
                <li>Key: At least 8 characters</li>
                <li>Modern symmetric encryption algorithm</li>
                <li>Fast and efficient for bulk data</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <i className="fas fa-history"></i>
            Using History
          </h2>
          <div className={styles.textContent}>
            <p>
              All encryption and decryption operations are automatically logged in the History page. 
              You can view:
            </p>
            <ul className={styles.featureList}>
              <li>Timestamp of each operation</li>
              <li>Algorithm and mode (Encrypt/Decrypt)</li>
              <li>Input and output values</li>
              <li>Complete operation details</li>
            </ul>
            <p>
              Navigate to the "History" tab to see all your past operations. This is useful for 
              tracking your cryptographic activities and reviewing previous encryptions.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <i className="fas fa-chart-line"></i>
            Statistics & Analysis
          </h2>
          <div className={styles.textContent}>
            <p>
              The Statistics page provides detailed analysis of encryption strength:
            </p>
            <div className={styles.metrics}>
              <div className={styles.metric}>
                <h4>Entropy</h4>
                <p>Measures the randomness and unpredictability of encrypted data. Higher entropy indicates better encryption.</p>
              </div>
              <div className={styles.metric}>
                <h4>Avalanche Effect</h4>
                <p>Shows how much the output changes when input changes slightly. Higher percentage indicates better diffusion.</p>
              </div>
            </div>
            <p>
              These metrics help evaluate the security strength of your encrypted data.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <i className="fas fa-shield-alt"></i>
            Hybrid System
          </h2>
          <div className={styles.textContent}>
            <p>
              The Hybrid System combines DES and RSA for optimal security:
            </p>
            <ol className={styles.processList}>
              <li><strong>DES Encryption:</strong> Fast symmetric encryption of your message</li>
              <li><strong>RSA Encryption:</strong> Secure asymmetric encryption of the DES key</li>
              <li><strong>Result:</strong> Both encrypted message and encrypted key are provided</li>
            </ol>
            <p>
              This hybrid approach combines the speed of DES with the security of RSA, 
              similar to how HTTPS/SSL works.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <i className="fas fa-question-circle"></i>
            Tips & Best Practices
          </h2>
          <div className={styles.tips}>
            <div className={styles.tip}>
              <i className="fas fa-lightbulb"></i>
              <div>
                <h4>Use Strong Keys</h4>
                <p>Choose keys that are long and unpredictable for better security</p>
              </div>
            </div>
            <div className={styles.tip}>
              <i className="fas fa-lightbulb"></i>
              <div>
                <h4>Keep Keys Secure</h4>
                <p>Never share your encryption keys with unauthorized parties</p>
              </div>
            </div>
            <div className={styles.tip}>
              <i className="fas fa-lightbulb"></i>
              <div>
                <h4>Verify Results</h4>
                <p>Always test decryption to ensure your encryption worked correctly</p>
              </div>
            </div>
            <div className={styles.tip}>
              <i className="fas fa-lightbulb"></i>
              <div>
                <h4>Use Hybrid for Important Data</h4>
                <p>For sensitive information, use the Hybrid System for maximum security</p>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.cta}>
          <h3>Ready to Start?</h3>
          <p>Begin encrypting your data now</p>
          <Link to="/encryption" className={styles.ctaButton}>
            <i className="fas fa-rocket"></i>
            Go to Encryption
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Guide;

