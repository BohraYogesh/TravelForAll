import React, {createContext, useState, useContext, useMemo} from 'react';

const AppContext = createContext();

export const TravelForAll = () => {
  return useContext(AppContext);
};

export const AppProvider = ({children}) => {
  const [language, setLanguage] = useState('en');

  const value = useMemo(
    () => ({
      setLanguage,
    }),
    
    [
      language,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
