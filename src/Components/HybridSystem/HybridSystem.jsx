import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { useCrypto } from '../../context/CryptoContext';
import styles from './HybridSystem.module.css';

// Simple RSA-like key generation (for demonstration)
const generateRSAKeys = () => {
  // In a real implementation, this would generate proper RSA keys
  // For demo purposes, we'll use a simple approach
  return {
    publicKey: 'demo-public-key',
    privateKey: 'demo-private-key'
  };
};

const HybridSystem = () => {
  const [plaintext, setPlaintext] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [encryptedKey, setEncryptedKey] = useState('');
  const [desKey, setDesKey] = useState('');
  const { addToHistory } = useCrypto();
  const [rsaKeys] = useState(generateRSAKeys());

  const generateDESKey = () => {
    // Generate a random 8-byte key for DES
    const key = CryptoJS.lib.WordArray.random(8).toString();
    return key;
  };

  const hybridEncrypt = () => {
    try {
      // Generate DES key
      const key = desKey || generateDESKey();
      setDesKey(key);

      // Encrypt message with DES
      const encrypted = CryptoJS.DES.encrypt(plaintext, key).toString();
      setEncryptedMessage(encrypted);

      // Encrypt DES key with RSA (simplified - in real implementation use proper RSA)
      // For demo, we'll use AES to simulate RSA encryption of the key
      const encryptedKeyValue = CryptoJS.AES.encrypt(key, rsaKeys.publicKey).toString();
      setEncryptedKey(encryptedKeyValue);

      addToHistory({
        algorithm: 'HYBRID',
        mode: 'ENC',
        input: plaintext,
        output: encrypted
      });
    } catch (error) {
      console.error('Encryption error:', error);
    }
  };

  const hybridDecrypt = () => {
    try {
      // Decrypt DES key with RSA (simplified)
      const decryptedKey = CryptoJS.AES.decrypt(encryptedKey, rsaKeys.privateKey).toString(
        CryptoJS.enc.Utf8
      );

      // Decrypt message with DES
      const decrypted = CryptoJS.DES.decrypt(encryptedMessage, decryptedKey).toString(
        CryptoJS.enc.Utf8
      );

      setPlaintext(decrypted);

      addToHistory({
        algorithm: 'HYBRID',
        mode: 'DEC',
        input: encryptedMessage,
        output: decrypted
      });
    } catch (error) {
      console.error('Decryption error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <i className="fas fa-key"></i>
        </div>
        <h1>Hybrid Cryptosystem</h1>
        <p className={styles.subtitle}>DES + RSA - Combining speed with security</p>
      </div>

      <div className={styles.content}>
        <div className={styles.algorithmCard}>
          <div className={styles.algorithmHeader}>
            <div className={styles.algorithmItem}>
              <i className="fas fa-bolt"></i>
              <span>DES</span>
              <span className={styles.algorithmDesc}>Fast Encryption</span>
            </div>
            <div className={styles.plus}>+</div>
            <div className={styles.algorithmItem}>
              <i className="fas fa-shield-alt"></i>
              <span>RSA</span>
              <span className={styles.algorithmDesc}>Secure Key Exchange</span>
            </div>
          </div>
        </div>

        <div className={styles.inputCard}>
          <label className={styles.label}>
            <i className="fas fa-file-text"></i>
            <span>Plain Text (User Input)</span>
          </label>
          <textarea
            className={styles.textarea}
            placeholder="Enter your plaintext message here..."
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
          />
          <div className={styles.charCount}>{plaintext.length} characters</div>
        </div>

        <div className={styles.outputGrid}>
          <div className={styles.outputCard}>
            <label className={styles.label}>
              <i className="fas fa-lock"></i>
              <span>Encrypted Message</span>
              <span className={styles.badge}>DES Output</span>
            </label>
            <textarea
              className={`${styles.textarea} ${styles.output}`}
              placeholder="Encrypted message will appear here..."
              value={encryptedMessage}
              readOnly
            />
            <div className={styles.charCount}>{encryptedMessage.length} characters</div>
          </div>

          <div className={styles.outputCard}>
            <label className={styles.label}>
              <i className="fas fa-key"></i>
              <span>Encrypted DES Key</span>
              <span className={styles.badge}>RSA Output</span>
            </label>
            <textarea
              className={`${styles.textarea} ${styles.keyOutput}`}
              placeholder="Encrypted key will appear here..."
              value={encryptedKey}
              readOnly
            />
            <div className={styles.charCount}>{encryptedKey.length} characters</div>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button className={`${styles.button} ${styles.encryptBtn}`} onClick={hybridEncrypt}>
            <i className="fas fa-lock"></i>
            <span>Hybrid Encrypt</span>
          </button>
          <button className={`${styles.button} ${styles.decryptBtn}`} onClick={hybridDecrypt}>
            <i className="fas fa-unlock"></i>
            <span>Hybrid Decrypt</span>
          </button>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoHeader}>
            <i className="fas fa-info-circle"></i>
            <span>How It Works</span>
          </div>
          <div className={styles.infoContent}>
            <div className={styles.infoRow}>
              <i className="fas fa-check-circle"></i>
              <span><strong>Type:</strong> Modern Hybrid Cryptography</span>
            </div>
            <div className={styles.infoRow}>
              <i className="fas fa-bolt"></i>
              <span>DES encrypts the message (fast symmetric encryption)</span>
            </div>
            <div className={styles.infoRow}>
              <i className="fas fa-shield-alt"></i>
              <span>RSA encrypts the DES key (secure asymmetric encryption)</span>
            </div>
            <div className={styles.infoRow}>
              <i className="fas fa-globe"></i>
              <span>Used in HTTPS / SSL / TLS protocols</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HybridSystem;

