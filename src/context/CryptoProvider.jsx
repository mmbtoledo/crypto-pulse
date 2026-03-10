import { useState } from 'react';
import { CryptoContext } from './CryptoContext';

export const CryptoProvider = ({ children }) => {
    const [coins, setCoins] = useState([]);
    const [currency, setCurrency] = useState('USD'); // Default currency

    return (
        <CryptoContext.Provider value={{ coins, setCoins, currency, setCurrency }}>
            {children}
        </CryptoContext.Provider>
    );
};
