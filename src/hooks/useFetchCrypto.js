import { useState, useEffect } from 'react';
import { useCrypto } from '../context/CryptoContext';

// 1. The "Memory Bank" sits outside the hook so it survives page changes
const apiCache = {};

export const useFetchCrypto = () => {
    const { setCoins, currency } = useCrypto(); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarket = async () => {
            
            // 2. CACHE CHECK: Did we fetch this currency in the last 60 seconds?
            if (apiCache[currency] && (Date.now() - apiCache[currency].timestamp < 60000)) {
                console.log(`Using cached data for ${currency}`);
                setCoins(apiCache[currency].data);
                setLoading(false);
                setError(null);
                return; // Stop here! Don't ping the API.
            }

            setLoading(true);
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=10&page=1`);
                
                // Specifically catch the Rate Limit error
                if (res.status === 429) throw new Error("API Rate Limit Exceeded. Please wait 60 seconds.");
                if (!res.ok) throw new Error("API Connection Intercepted.");
                
                const data = await res.json();
                
                // 3. SAVE TO CACHE: Store the fresh data and the current time
                apiCache[currency] = {
                    data: data,
                    timestamp: Date.now()
                };

                setCoins(data);
                setError(null); // Clear any previous errors
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchMarket();
        
    }, [setCoins, currency]);

    return { loading, error };
};