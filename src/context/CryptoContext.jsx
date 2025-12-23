import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const CryptoContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error('useCrypto must be used within CryptoProvider');
  }
  return context;
};

export const CryptoProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  const addToHistory = (operation) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    const historyEntry = {
      id: Date.now(),
      timestamp: `[${timestamp}]`,
      operation: operation.algorithm,
      mode: operation.mode,
      input: operation.input,
      output: operation.output
    };
    setHistory(prev => [...prev, historyEntry]);
  };

  return (
    <CryptoContext.Provider value={{ history, addToHistory }}>
      {children}
    </CryptoContext.Provider>
  );
};

CryptoProvider.propTypes = {
  children: PropTypes.node.isRequired
};

