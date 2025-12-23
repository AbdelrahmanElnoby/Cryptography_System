import React, { useState } from 'react';
import { useCrypto } from '../../context/CryptoContext';
import {
  caesarEncrypt,
  caesarDecrypt,
  hillEncrypt,
  hillDecrypt,
  vigenereEncrypt,
  vigenereDecrypt
} from '../../utils/cryptoUtils';
import styles from './Encryption.module.css';

const Encryption = () => {
  const [cipher, setCipher] = useState('Caesar');
  const [plaintext, setPlaintext] = useState('');
  const [key, setKey] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [error, setError] = useState('');
  const { addToHistory } = useCrypto();

  const cipherInfo = {
    Caesar: {
      type: 'Classical Cipher',
      idea: 'Each letter is shifted by a fixed number.',
      keyLabel: 'Key: NUMBER only (e.g. 3)',
      keyPlaceholder: '5'
    },
    Hill: {
      type: 'Classical Cipher',
      idea: 'Uses matrix multiplication.',
      keyLabel: 'Key: 4 NUMBERS (e.g. 3 3 2 5)',
      keyPlaceholder: '5 2 3 3'
    },
    Vigenere: {
      type: 'Classical Cipher',
      idea: 'Uses a word to apply multiple Caesar shifts.',
      keyLabel: 'Key: LETTERS only',
      keyPlaceholder: 'KEY'
    }
  };

  const handleEncrypt = () => {
    try {
      setError('');
      let result = '';
      let input = plaintext;

      switch (cipher) {
        case 'Caesar':
          if (!key || isNaN(key)) {
            setError('Caesar cipher requires a NUMBER key');
            return;
          }
          result = caesarEncrypt(input, parseInt(key));
          break;
        case 'Hill':
          result = hillEncrypt(input, key);
          break;
        case 'Vigenere':
          result = vigenereEncrypt(input, key);
          break;
        default:
          return;
      }

      setCiphertext(result);
      addToHistory({
        algorithm: cipher,
        mode: 'ENC',
        input: input,
        output: result
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDecrypt = () => {
    try {
      setError('');
      let result = '';
      let input = ciphertext || plaintext;

      switch (cipher) {
        case 'Caesar':
          if (!key || isNaN(key)) {
            setError('Caesar cipher requires a NUMBER key');
            return;
          }
          result = caesarDecrypt(input, parseInt(key));
          break;
        case 'Hill':
          result = hillDecrypt(input, key);
          break;
        case 'Vigenere':
          result = vigenereDecrypt(input, key);
          break;
        default:
          return;
      }

      setPlaintext(result);
      addToHistory({
        algorithm: cipher,
        mode: 'DEC',
        input: input,
        output: result
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const showError = () => {
    if (error) {
      setTimeout(() => setError(''), 3000);
      return (
        <div className={styles.errorDialog}>
          <div className={styles.errorContent}>
            <div className={styles.errorIcon}>✕</div>
            <div className={styles.errorMessage}>{error}</div>
            <button className={styles.errorButton} onClick={() => setError('')}>OK</button>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <i className="fas fa-lock"></i>
        </div>
        <h1>Classical Cipher Encryption</h1>
        <p className={styles.subtitle}>Secure your data with classical cryptographic algorithms</p>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <label className={styles.label}>
            <i className="fas fa-code"></i>
            Select Cipher Algorithm
          </label>
          <select
            value={cipher}
            onChange={(e) => {
              setCipher(e.target.value);
              setPlaintext('');
              setCiphertext('');
              setKey('');
              setError('');
            }}
            className={styles.select}
          >
            <option value="Caesar">Caesar Cipher</option>
            <option value="Hill">Hill Cipher</option>
            <option value="Vigenere">Vigenère Cipher</option>
          </select>
        </div>

        <div className={styles.inputSection}>
          <div className={styles.inputCard}>
            <label className={styles.inputLabel}>
              <i className="fas fa-file-text"></i>
              Plaintext Input
            </label>
            <textarea
              className={styles.textarea}
              placeholder="Enter your plaintext message here..."
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
            />
            <div className={styles.charCount}>{plaintext.length} characters</div>
          </div>

          <div className={styles.keyCard}>
            <label className={styles.inputLabel}>
              <i className="fas fa-key"></i>
              Encryption Key
            </label>
            <div className={styles.keyInputWrapper}>
              <input
                type="text"
                className={styles.keyInput}
                placeholder={cipherInfo[cipher].keyPlaceholder}
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
              <div className={styles.keyHint}>
                <i className="fas fa-info-circle"></i>
                {cipherInfo[cipher].keyLabel}
              </div>
            </div>
          </div>

          <div className={styles.inputCard}>
            <label className={styles.inputLabel}>
              <i className="fas fa-shield-alt"></i>
              Ciphertext Output
            </label>
            <textarea
              className={`${styles.textarea} ${styles.output}`}
              placeholder="Encrypted/Decrypted result will appear here..."
              value={ciphertext}
              onChange={(e) => setCiphertext(e.target.value)}
              readOnly={!!ciphertext}
            />
            <div className={styles.charCount}>{ciphertext.length} characters</div>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button className={`${styles.button} ${styles.encryptBtn}`} onClick={handleEncrypt}>
            <i className="fas fa-lock"></i>
            <span>Encrypt</span>
          </button>
          <button className={`${styles.button} ${styles.decryptBtn}`} onClick={handleDecrypt}>
            <i className="fas fa-unlock"></i>
            <span>Decrypt</span>
          </button>
        </div>
      </div>

      <div className={styles.infoCard}>
        <div className={styles.infoHeader}>
          <i className="fas fa-info-circle"></i>
          <span>Algorithm Information</span>
        </div>
        <div className={styles.infoContent}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Type:</span>
            <span className={styles.infoValue}>{cipherInfo[cipher].type}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Principle:</span>
            <span className={styles.infoValue}>{cipherInfo[cipher].idea}</span>
          </div>
        </div>
      </div>

      {showError()}
    </div>
  );
};

export default Encryption;

