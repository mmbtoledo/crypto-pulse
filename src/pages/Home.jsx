import { useState, useRef, useEffect } from 'react';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import MarketChart from '../components/MarketChart';
import { useCrypto } from '../context/CryptoContext';

const Home = () => {
    const { loading, error } = useFetchCrypto();
    const { coins, currency } = useCrypto();
    
    // Controlled form state
    const [searchTerm, setSearchTerm] = useState('');
    
    // useRef for auto-focus
    const searchInputRef = useRef(null);

    // Auto-focus the search bar when the component loads
    useEffect(() => {
        if (!loading && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [loading]);

    // Filter coins based on search
    const filteredCoins = coins.filter(coin => 
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Loading State
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
                <h2 className="text-2xl animate-pulse text-cyan-400">Scanning Blockchain...</h2>
            </div>
        );
    }

    // Error State
    if (error) {
        return <div className="text-red-500 text-center mt-10 font-bold">Error: {error}</div>;
    }

    // Determine currency symbol
    const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₱';

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <div className="max-w-4xl mx-auto">
                
                <input 
                    type="text"
                    ref={searchInputRef}
                    placeholder="Search cryptocurrency..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-4 mb-8 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-white"
                />

                <MarketChart />

                <div className="mt-8 grid gap-4">
                    {filteredCoins.map(coin => (
                        <div key={coin.id} className="p-4 bg-gray-800 rounded-lg flex justify-between items-center shadow-md">
                            <div className="flex items-center gap-4">
                                <img src={coin.image} alt={coin.name} className="w-10 h-10" />
                                <div>
                                    <h3 className="font-bold text-lg">{coin.name}</h3>
                                    <span className="text-sm text-gray-400 uppercase">{coin.symbol}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg">{currencySymbol}{coin.current_price.toLocaleString()}</p>
                                
                                {/* STATE-BASED STYLING: Green if >= 0, Red if < 0 */}
                                <p className={`text-sm font-semibold ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {coin.price_change_percentage_24h >= 0 ? '▲ ' : '▼ '}
                                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                                </p>
                            </div>
                        </div>
                    ))}
                    
                    {filteredCoins.length === 0 && (
                        <div className="text-center text-gray-400 mt-6">
                            No coins found matching "{searchTerm}"
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;