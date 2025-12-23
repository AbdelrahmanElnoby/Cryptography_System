import React from 'react';
import { useCrypto } from '../../context/CryptoContext';
import styles from './History.module.css';

const History = () => {
  const { history } = useCrypto();

  const getModeIcon = (mode) => {
    return mode === 'ENC' ? 'fa-lock' : 'fa-unlock';
  };

  const getModeColor = (mode) => {
    return mode === 'ENC' ? '#3b82f6' : '#10b981';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <i className="fas fa-history"></i>
        </div>
        <h1>Operation History</h1>
        <p className={styles.subtitle}>Complete log of all cryptographic operations</p>
        {history.length > 0 && (
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <i className="fas fa-list"></i>
              <span>{history.length} Operations</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.historyContainer}>
        {history.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <i className="fas fa-inbox"></i>
            </div>
            <h3>No Operations Yet</h3>
            <p>Start encrypting or decrypting to see your operation history here.</p>
          </div>
        ) : (
          <div className={styles.historyList}>
            {history.map((entry, index) => (
              <div key={entry.id} className={styles.entryWrapper}>
                <div className={styles.historyEntry}>
                  <div className={styles.entryHeader}>
                    <div className={styles.entryMeta}>
                      <div 
                        className={styles.modeBadge}
                        style={{ backgroundColor: `${getModeColor(entry.mode)}15`, color: getModeColor(entry.mode) }}
                      >
                        <i className={`fas ${getModeIcon(entry.mode)}`}></i>
                        <span>{entry.mode}</span>
                      </div>
                      <div className={styles.algorithmBadge}>
                        <i className="fas fa-code"></i>
                        <span>{entry.algorithm}</span>
                      </div>
                    </div>
                    <div className={styles.timestamp}>
                      <i className="fas fa-clock"></i>
                      <span>{entry.timestamp}</span>
                    </div>
                  </div>
                  <div className={styles.entryContent}>
                    <div className={styles.dataCard}>
                      <div className={styles.dataHeader}>
                        <i className="fas fa-arrow-down"></i>
                        <span>Input</span>
                      </div>
                      <div className={styles.dataValue}>{entry.input || <span className={styles.empty}>Empty</span>}</div>
                    </div>
                    <div className={styles.arrow}>
                      <i className="fas fa-arrow-right"></i>
                    </div>
                    <div className={styles.dataCard}>
                      <div className={styles.dataHeader}>
                        <i className="fas fa-arrow-up"></i>
                        <span>Output</span>
                      </div>
                      <div className={styles.dataValue}>{entry.output || <span className={styles.empty}>Empty</span>}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;

