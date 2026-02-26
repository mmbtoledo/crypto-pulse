import { useRef, useEffect } from 'react';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import MarketChart from '../components/MarketChart';
import { useCrypto } from '../context/CryptoContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Home = () => {
    const { loading, error } = useFetchCrypto();
    const { coins, currency } = useCrypto();
    
    // Using the Custom Hook for local storage
    const [searchTerm, setSearchTerm] = useLocalStorage('cryptoSearchQuery', '');
    
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (!loading && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [loading]);

    const filteredCoins = coins.filter(coin => 
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-950 to-black text-white">
                <h2 className="text-2xl animate-pulse text-cyan-400">Scanning Blockchain...</h2>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center mt-10 font-bold bg-gradient-to-b from-blue-950 to-black h-screen pt-10">Error: {error}</div>;
    }

    const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₱';

    return (
        <div className="p-6 min-h-screen bg-gradient-to-b from-blue-950 to-black text-white">
            <div className="max-w-4xl mx-auto">
                
                <input 
                    type="text"
                    ref={searchInputRef}
                    placeholder="Search cryptocurrency..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-4 mb-8 rounded-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-white placeholder-gray-400 shadow-sm"
                />

                <MarketChart />

                <div className="mt-8 grid gap-4">
                    {filteredCoins.map(coin => (
                        <div key={coin.id} className="p-4 bg-gray-800/60 rounded-lg flex justify-between items-center shadow-md border border-gray-700/50 backdrop-blur-sm">
                            <div className="flex items-center gap-4">
                                <img src={coin.image} alt={coin.name} className="w-10 h-10 drop-shadow-md" />
                                <div>
                                    <h3 className="font-bold text-lg tracking-wide">{coin.name}</h3>
                                    <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">{coin.symbol}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg tracking-wide">{currencySymbol}{coin.current_price.toLocaleString()}</p>
                                
                                {/* STATE-BASED STYLING */}
                                <p className={`text-sm font-bold tracking-wider mt-1 ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {coin.price_change_percentage_24h >= 0 ? '▲ ' : '▼ '}
                                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                                </p>
                            </div>
                        </div>
                    ))}
                    
                    {filteredCoins.length === 0 && (
                        <div className="text-center text-gray-400 mt-6 bg-gray-800/40 p-6 rounded-lg border border-gray-700/50">
                            No coins found matching "{searchTerm}"
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;