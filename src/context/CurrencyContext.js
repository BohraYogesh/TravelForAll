import React, { createContext, useState, useContext } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
  return useContext(CurrencyContext);
};

export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  
  const conversionRate = 0.01172; 

  const value = {
    selectedCurrency,
    setSelectedCurrency,
    conversionRate
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
