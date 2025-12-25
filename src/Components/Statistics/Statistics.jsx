import React, { useState, useEffect, useMemo } from 'react';
import { useCrypto } from '../../context/CryptoContext';
import { calculateEntropy, calculateAvalanche } from '../../utils/cryptoUtils';
import styles from './Statistics.module.css';

const Statistics = () => {
  const { history } = useCrypto();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('ALL');
  const [viewMode, setViewMode] = useState('overview'); // 'overview', 'algorithm', 'comparison'

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

  // Calculate overall statistics
  const overallStats = useMemo(() => {
    const encEntries = filteredHistory.filter(entry => entry.mode === 'ENC');
    const decEntries = filteredHistory.filter(entry => entry.mode === 'DEC');
    
    if (encEntries.length === 0) {
      return {
        totalOperations: filteredHistory.length,
        encryptionCount: encEntries.length,
        decryptionCount: decEntries.length,
        avgEntropy: 0,
        avgAvalanche: 0,
        totalDataProcessed: 0,
        algorithm: selectedAlgorithm === 'ALL' ? 'ALL ALGORITHMS' : selectedAlgorithm
      };
    }

    // Calculate average entropy
    const entropies = encEntries.map(entry => calculateEntropy(entry.output)).filter(e => !isNaN(e));
    const avgEntropy = entropies.length > 0 
      ? entropies.reduce((sum, e) => sum + e, 0) / entropies.length 
      : 0;

    // Calculate average avalanche (when we have multiple entries)
    let avalanches = [];
    for (let i = 1; i < encEntries.length; i++) {
      const prev = encEntries[i - 1];
      const curr = encEntries[i];
      const avalanche = calculateAvalanche(prev.input, prev.output, curr.output);
      if (!isNaN(avalanche)) avalanches.push(avalanche);
    }
    const avgAvalanche = avalanches.length > 0
      ? avalanches.reduce((sum, a) => sum + a, 0) / avalanches.length
      : 0;

    // Calculate total data processed (sum of input lengths)
    const totalDataProcessed = filteredHistory.reduce((sum, entry) => sum + (entry.input?.length || 0), 0);

    return {
      totalOperations: filteredHistory.length,
      encryptionCount: encEntries.length,
      decryptionCount: decEntries.length,
      avgEntropy,
      avgAvalanche,
      totalDataProcessed,
      algorithm: selectedAlgorithm === 'ALL' ? 'ALL ALGORITHMS' : selectedAlgorithm
    };
  }, [filteredHistory, selectedAlgorithm]);

  // Calculate per-algorithm statistics
  const algorithmStats = useMemo(() => {
    const stats = {};
    const algorithms = new Set(history.map(entry => entry.algorithm));
    
    algorithms.forEach(algo => {
      const algoEntries = history.filter(entry => entry.algorithm === algo);
      const encEntries = algoEntries.filter(entry => entry.mode === 'ENC');
      
      if (encEntries.length > 0) {
        const entropies = encEntries.map(entry => calculateEntropy(entry.output)).filter(e => !isNaN(e));
        const avgEntropy = entropies.length > 0 
          ? entropies.reduce((sum, e) => sum + e, 0) / entropies.length 
          : 0;
        
        stats[algo] = {
          count: algoEntries.length,
          avgEntropy,
          encryptionCount: encEntries.length,
          decryptionCount: algoEntries.filter(e => e.mode === 'DEC').length
        };
      } else {
        stats[algo] = {
          count: algoEntries.length,
          avgEntropy: 0,
          encryptionCount: 0,
          decryptionCount: algoEntries.filter(e => e.mode === 'DEC').length
        };
      }
    });
    
    return stats;
  }, [history]);

  // Get latest entry statistics for detailed view
  const latestStats = useMemo(() => {
    if (filteredHistory.length === 0) return null;
    
    const encEntries = filteredHistory.filter(entry => entry.mode === 'ENC');
    if (encEntries.length === 0) return null;
    
    const lastEntry = encEntries[encEntries.length - 1];
    const entropy = calculateEntropy(lastEntry.output);
    
    // Calculate avalanche if we have previous entry
    let avalanche = 0;
    if (encEntries.length > 1) {
      const prevEntry = encEntries[encEntries.length - 2];
      avalanche = calculateAvalanche(prevEntry.input, prevEntry.output, lastEntry.output);
    }
    
    return {
      entropy,
      avalanche: isNaN(avalanche) ? 0 : avalanche,
      algorithm: lastEntry.algorithm
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
  const avalancheValue = latestStats ? latestStats.avalanche : overallStats.avgAvalanche;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <i className="fas fa-chart-line"></i>
        </div>
        <h1>Encryption Strength Analysis</h1>
        <p className={styles.subtitle}>Comprehensive statistical analysis of cryptographic algorithms</p>
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

      {/* Summary Cards */}
      <div className={styles.summaryCards}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <i className="fas fa-tasks"></i>
          </div>
          <div className={styles.summaryContent}>
            <div className={styles.summaryLabel}>Total Operations</div>
            <div className={styles.summaryValue}>{overallStats.totalOperations}</div>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <i className="fas fa-lock"></i>
          </div>
          <div className={styles.summaryContent}>
            <div className={styles.summaryLabel}>Encryptions</div>
            <div className={styles.summaryValue}>{overallStats.encryptionCount}</div>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <i className="fas fa-unlock"></i>
          </div>
          <div className={styles.summaryContent}>
            <div className={styles.summaryLabel}>Decryptions</div>
            <div className={styles.summaryValue}>{overallStats.decryptionCount}</div>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <i className="fas fa-database"></i>
          </div>
          <div className={styles.summaryContent}>
            <div className={styles.summaryLabel}>Data Processed</div>
            <div className={styles.summaryValue}>
              {overallStats.totalDataProcessed.toLocaleString()} <span className={styles.summaryUnit}>chars</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {/* Algorithm Performance Card */}
        <div className={styles.analysisCard}>
          <div className={styles.cardHeader}>
            <i className="fas fa-shield-alt"></i>
            <h2>Algorithm Performance</h2>
          </div>
          
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <i className="fas fa-code"></i>
                <span>Algorithm</span>
              </div>
              <div className={styles.infoValue}>{overallStats.algorithm}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <i className="fas fa-random"></i>
                <span>Average Entropy</span>
              </div>
              <div className={styles.infoValue}>
                <span className={styles.metricValue} style={{ color: getEntropyColor(overallStats.avgEntropy) }}>
                  {overallStats.avgEntropy.toFixed(4)}
                </span>
                <span className={styles.metricMax}>/8</span>
              </div>
            </div>
            {latestStats && (
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>
                  <i className="fas fa-random"></i>
                  <span>Latest Entropy</span>
                </div>
                <div className={styles.infoValue}>
                  <span className={styles.metricValue} style={{ color: getEntropyColor(latestStats.entropy) }}>
                    {latestStats.entropy.toFixed(4)}
                  </span>
                  <span className={styles.metricMax}>/8</span>
                </div>
              </div>
            )}
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <i className="fas fa-wave-square"></i>
                <span>Avg Avalanche Effect</span>
              </div>
              <div className={styles.infoValue}>
                <span className={styles.metricValue} style={{ color: getAvalancheColor(overallStats.avgAvalanche) }}>
                  {overallStats.avgAvalanche.toFixed(2)}%
                </span>
              </div>
            </div>
            {latestStats && latestStats.avalanche > 0 && (
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>
                  <i className="fas fa-wave-square"></i>
                  <span>Latest Avalanche</span>
                </div>
                <div className={styles.infoValue}>
                  <span className={styles.metricValue} style={{ color: getAvalancheColor(latestStats.avalanche) }}>
                    {latestStats.avalanche.toFixed(2)}%
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className={styles.notes}>
            <div className={styles.noteItem}>
              <i className="fas fa-info-circle"></i>
              <span>Entropy measures randomness - higher values indicate stronger encryption</span>
            </div>
            <div className={styles.noteItem}>
              <i className="fas fa-info-circle"></i>
              <span>Avalanche effect shows how small input changes affect output - ideal is 50%+</span>
            </div>
            {selectedAlgorithm !== 'ALL' && (
              <div className={styles.noteItem}>
                <i className="fas fa-check-circle"></i>
                <span>Statistics filtered for {selectedAlgorithm} algorithm</span>
              </div>
            )}
          </div>
        </div>

        {/* Comparison Card */}
        {selectedAlgorithm === 'ALL' && Object.keys(algorithmStats).length > 1 && (
          <div className={styles.comparisonCard}>
            <div className={styles.cardHeader}>
              <i className="fas fa-balance-scale"></i>
              <h2>Algorithm Comparison</h2>
            </div>
            <div className={styles.comparisonGrid}>
              {Object.entries(algorithmStats).map(([algo, stats]) => (
                <div key={algo} className={styles.comparisonItem}>
                  <div className={styles.comparisonHeader}>
                    <i className={`fas ${getAlgorithmIcon(algo)}`}></i>
                    <span className={styles.comparisonAlgo}>{algo}</span>
                  </div>
                  <div className={styles.comparisonStats}>
                    <div className={styles.comparisonStat}>
                      <span className={styles.comparisonLabel}>Operations</span>
                      <span className={styles.comparisonValue}>{stats.count}</span>
                    </div>
                    <div className={styles.comparisonStat}>
                      <span className={styles.comparisonLabel}>Avg Entropy</span>
                      <span className={styles.comparisonValue} style={{ color: getEntropyColor(stats.avgEntropy) }}>
                        {stats.avgEntropy.toFixed(3)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chart Card */}
        {latestStats && (
          <div className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <i className="fas fa-chart-bar"></i>
              <h2>Statistical Visualization</h2>
            </div>
            
            <div className={styles.chartContainer}>
              <div className={styles.chart}>
                <div className={styles.barGroup}>
                  <div className={styles.barLabel}>
                    <i className="fas fa-random"></i>
                    <span>Latest Entropy</span>
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
                {latestStats.avalanche > 0 && (
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
                            height: `${Math.max(latestStats.avalanche, 5)}%`,
                            background: `linear-gradient(180deg, ${getAvalancheColor(latestStats.avalanche)} 0%, ${getAvalancheColor(latestStats.avalanche)}dd 100%)`
                          }}
                        >
                          <span className={styles.barValue}>{latestStats.avalanche.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {latestStats.avalanche === 0 && (
                  <div className={styles.barGroup}>
                    <div className={styles.barLabel}>
                      <i className="fas fa-wave-square"></i>
                      <span>Avg Avalanche</span>
                    </div>
                    <div className={styles.barWrapper}>
                      <div className={styles.barBackground}>
                        <div
                          className={styles.bar}
                          style={{ 
                            height: `${Math.max(overallStats.avgAvalanche, 5)}%`,
                            background: `linear-gradient(180deg, ${getAvalancheColor(overallStats.avgAvalanche)} 0%, ${getAvalancheColor(overallStats.avgAvalanche)}dd 100%)`
                          }}
                        >
                          <span className={styles.barValue}>{overallStats.avgAvalanche.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
        )}

        {filteredHistory.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <i className="fas fa-chart-bar"></i>
            </div>
            <h3>No Data Available</h3>
            <p>Start encrypting data to see statistics for {selectedAlgorithm === 'ALL' ? 'algorithms' : selectedAlgorithm}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;

