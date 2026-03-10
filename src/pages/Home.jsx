import { useRef, useEffect } from 'react';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import { useCrypto } from '../hooks/useCrypto';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Home = () => {
    const { loading, error } = useFetchCrypto();
    const { coins, currency } = useCrypto();
    
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

    const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₱';

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-cyan-400 font-mono text-xl tracking-widest">
                <span className="animate-pulse drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">ESTABLISHING CONNECTION...</span>
            </div>
        );
    }

    if (error) {
        return <div className="text-rose-500 font-mono text-center mt-10 font-bold h-screen pt-10 uppercase tracking-widest">System Error: {error}</div>;
    }

    return (
        <div className="p-4 sm:p-6 min-h-screen font-sans selection:bg-cyan-500/30">
            <div className="max-w-4xl mx-auto">
                
                {/* Cyberpunk Search Bar */}
                <div className="relative mb-8">
                    <input 
                        type="text"
                        ref={searchInputRef}
                        placeholder="QUERY BLOCKCHAIN_DATA..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-4 bg-slate-900/80 border border-slate-700 rounded-none focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all text-cyan-50 placeholder-slate-500 font-mono uppercase tracking-wider text-sm sm:text-base"
                    />
                    <div className="absolute top-0 right-0 h-full w-2 bg-cyan-500/50"></div>
                </div>

                {/* The Responsive Grid */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {filteredCoins.map(coin => (
                        <div key={coin.id} className="p-4 bg-slate-900 border-l-4 border-l-slate-700 hover:border-l-cyan-400 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 transition-all group shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                            <div className="flex items-center gap-4 sm:gap-5">
                                <div className="p-2 bg-slate-800 rounded group-hover:bg-slate-700 transition-colors">
                                    <img src={coin.image} alt={coin.name} className="w-8 h-8 filter drop-shadow-lg" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base sm:text-lg text-slate-100 tracking-wide">{coin.name}</h3>
                                    <span className="text-xs text-cyan-600 font-mono font-bold uppercase tracking-widest">{coin.symbol}</span>
                                </div>
                            </div>
                            
                            {/* Responsive Price - Left aligned on mobile, Right aligned on desktop */}
                            <div className="w-full sm:w-auto text-left sm:text-right font-mono border-t border-slate-800 sm:border-0 pt-3 sm:pt-0 mt-1 sm:mt-0">
                                <p className="font-bold text-base sm:text-lg text-slate-200 tracking-wider">
                                    {currencySymbol}{coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                                </p>
                                <p className={`text-xs sm:text-sm font-bold tracking-widest mt-1 drop-shadow-md ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {coin.price_change_percentage_24h >= 0 ? '[+] ' : '[-] '}
                                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                                </p>
                            </div>
                        </div>
                    ))}
                    
                    {filteredCoins.length === 0 && (
                        <div className="col-span-1 lg:col-span-2 text-center text-slate-500 font-mono mt-6 border border-dashed border-slate-700 p-8 uppercase tracking-widest text-sm">
                            [ DATA NOT FOUND FOR "{searchTerm}" ]
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;