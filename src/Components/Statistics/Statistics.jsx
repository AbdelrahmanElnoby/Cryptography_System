import React, { useState, useMemo } from 'react';
import { useCrypto } from '../../context/CryptoContext';
import { calculateEntropy, calculateAvalanche } from '../../utils/cryptoUtils';
import styles from './Statistics.module.css';

const Statistics = () => {
  const { history } = useCrypto();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('ALL');

  // Get all available algorithms from history
  const availableAlgorithms = useMemo(() => {
    const algorithms = new Set(history.map(entry => entry.algorithm));
    return ['ALL', ...Array.from(algorithms)].sort();
  }, [history]);

  // Filter history based on selected algorithm
  const filteredHistory = useMemo(() => {
    if (selectedAlgorithm === 'ALL') return history;
    return history.filter(entry => entry.algorithm === selectedAlgorithm);
  }, [history, selectedAlgorithm]);

  // Get latest entry statistics for detailed view
  const latestStats = useMemo(() => {
    if (filteredHistory.length === 0) return null;
    
    const encEntries = filteredHistory.filter(entry => entry.mode === 'ENC');
    if (encEntries.length === 0) return null;
    
    const lastEntry = encEntries[encEntries.length - 1];
    const entropy = calculateEntropy(lastEntry.output);
    
    // Calculate avalanche effect - compare with previous entry
    let avalanche = 0;
    if (encEntries.length > 1) {
      const prevEntry = encEntries[encEntries.length - 2];
      avalanche = calculateAvalanche(prevEntry.input, prevEntry.output, lastEntry.output);
    } else {
      // When we only have one entry, we can't calculate avalanche yet
      // But we'll show 0 and it will update when more entries are added
      avalanche = 0;
    }
    
    // Format algorithm name
    let algorithmName = lastEntry.algorithm;
    if (algorithmName === 'HYBRID') {
      algorithmName = 'HYBRID (DES + RSA)';
    }
    
    return {
      entropy,
      avalanche: isNaN(avalanche) ? 0 : avalanche,
      algorithm: algorithmName,
      rawAlgorithm: lastEntry.algorithm
    };
  }, [filteredHistory]);

  const getEntropyColor = (entropyVal) => {
    const percentage = (entropyVal / 8) * 100;
    if (percentage >= 70) return '#10b981';
    if (percentage >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const getAvalancheColor = (avalancheVal) => {
    if (avalancheVal >= 80) return '#10b981';
    if (avalancheVal >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getAlgorithmIcon = (algo) => {
    const icons = {
      'ALL': 'fa-layer-group',
      'Caesar': 'fa-shuffle',
      'Hill': 'fa-square',
      'Vigenere': 'fa-key',
      'DES': 'fa-lock',
      'Playfair': 'fa-table',
      'HYBRID': 'fa-shield-alt',
      'RSA': 'fa-unlock-alt'
    };
    return icons[algo] || 'fa-code';
  };

  const entropyPercentage = latestStats ? (latestStats.entropy / 8) * 100 : 0;
  const avalancheValue = latestStats ? latestStats.avalanche : 0;

  // Get notes based on algorithm
  const getNotes = (stats) => {
    if (!stats) return [];
    const notes = [];
    
    if (stats.rawAlgorithm === 'HYBRID') {
      notes.push('DES output used for entropy');
    } else {
      notes.push(`${stats.rawAlgorithm} output used for entropy`);
    }
    
    notes.push('One-bit change in input tested');
    
    return notes;
  };

  if (!latestStats) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <i className="fas fa-chart-line"></i>
          </div>
          <h1>Encryption Strength Analysis</h1>
        </div>

        {/* Algorithm Selector */}
        <div className={styles.algorithmSelector}>
          {availableAlgorithms.map(algo => (
            <button
              key={algo}
              className={`${styles.algorithmButton} ${selectedAlgorithm === algo ? styles.active : ''}`}
              onClick={() => setSelectedAlgorithm(algo)}
            >
              <i className={`fas ${getAlgorithmIcon(algo)}`}></i>
              <span>{algo}</span>
            </button>
          ))}
        </div>

        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <i className="fas fa-chart-bar"></i>
          </div>
          <h3>No Data Available</h3>
          <p>Start encrypting data to see statistics for {selectedAlgorithm === 'ALL' ? 'algorithms' : selectedAlgorithm}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <i className="fas fa-chart-line"></i>
        </div>
        <h1>Encryption Strength Analysis</h1>
      </div>

      {/* Algorithm Selector */}
      <div className={styles.algorithmSelector}>
        {availableAlgorithms.map(algo => (
          <button
            key={algo}
            className={`${styles.algorithmButton} ${selectedAlgorithm === algo ? styles.active : ''}`}
            onClick={() => setSelectedAlgorithm(algo)}
          >
            <i className={`fas ${getAlgorithmIcon(algo)}`}></i>
            <span>{algo}</span>
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {/* Analysis Details Card */}
        <div className={styles.analysisCard}>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <div className={styles.detailLabel}>Algorithm:</div>
              <div className={styles.detailValue}>{latestStats.algorithm}</div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.detailLabel}>Entropy Value:</div>
              <div className={styles.detailValue} style={{ color: getEntropyColor(latestStats.entropy) }}>
                {latestStats.entropy.toFixed(4)}/8
              </div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.detailLabel}>Avalanche Effect:</div>
              <div className={styles.detailValue} style={{ color: getAvalancheColor(latestStats.avalanche) }}>
                {latestStats.avalanche.toFixed(2)}%
              </div>
            </div>
          </div>

          <div className={styles.notes}>
            {getNotes(latestStats).map((note, index) => (
              <div key={index} className={styles.noteItem}>
                <i className="fas fa-info-circle"></i>
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Card */}
        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h2>
              {latestStats.rawAlgorithm === 'HYBRID' 
                ? 'Hybrid Encryption Statistical Analysis'
                : `${latestStats.rawAlgorithm} Encryption Statistical Analysis`}
            </h2>
          </div>
          
          <div className={styles.chartContainer}>
            <div className={styles.chart}>
              <div className={styles.barGroup}>
                <div className={styles.barLabel}>
                  <i className="fas fa-random"></i>
                  <span>Entropy</span>
                </div>
                <div className={styles.barWrapper}>
                  <div className={styles.barBackground}>
                    <div
                      className={styles.bar}
                      style={{ 
                        height: `${Math.max(entropyPercentage, 5)}%`,
                        background: `linear-gradient(180deg, ${getEntropyColor(latestStats.entropy)} 0%, ${getEntropyColor(latestStats.entropy)}dd 100%)`
                      }}
                    >
                      <span className={styles.barValue}>{latestStats.entropy.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.barGroup}>
                <div className={styles.barLabel}>
                  <i className="fas fa-wave-square"></i>
                  <span>Avalanche Effect</span>
                </div>
                <div className={styles.barWrapper}>
                  <div className={styles.barBackground}>
                    <div
                      className={styles.bar}
                      style={{ 
                        height: `${Math.max(avalancheValue, 5)}%`,
                        background: `linear-gradient(180deg, ${getAvalancheColor(avalancheValue)} 0%, ${getAvalancheColor(avalancheValue)}dd 100%)`
                      }}
                    >
                      <span className={styles.barValue}>{avalancheValue.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.yAxis}>
              <div className={styles.yLabel}>100</div>
              <div className={styles.yLabel}>80</div>
              <div className={styles.yLabel}>60</div>
              <div className={styles.yLabel}>40</div>
              <div className={styles.yLabel}>20</div>
              <div className={styles.yLabel}>0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

