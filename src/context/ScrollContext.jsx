import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const ScrollContext = createContext();

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within ScrollProvider');
  }
  return context;
};

export const ScrollProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <ScrollContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ScrollContext.Provider>
  );
};

ScrollProvider.propTypes = {
  children: PropTypes.node.isRequired
};

