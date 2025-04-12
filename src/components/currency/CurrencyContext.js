import React, {createContext, useContext, useState, useEffect} from 'react';
import currencyApi from '../../api/api'; // Your axios setup

const CurrencyContext = createContext();

export const CurrencyProvider = ({children}) => {
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchRates = async (baseCurrency) => {
    try {
      setLoading(true);
      const response = await currencyApi.get(`/latest?from=${baseCurrency}`);
      setExchangeRates(response.data.rates);
    } catch (error) {
      console.error('Failed to fetch rates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates(selectedCurrency);
  }, [selectedCurrency]);

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        exchangeRates,
        setSelectedCurrency,
        loading,
      }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
