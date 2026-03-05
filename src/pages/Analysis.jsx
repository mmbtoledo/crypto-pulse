import MarketChart from '../components/MarketChart';
import { useFetchCrypto } from '../hooks/useFetchCrypto';

const Analysis = () => {
    // 1. Call the hook here so it listens for currency changes on this page!
    const { loading, error } = useFetchCrypto();

    // 2. Add the digital loading state while it fetches the new currency prices
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-cyan-400 font-mono text-xl tracking-widest">
                <span className="animate-pulse drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">FETCHING NEW MARKET DATA...</span>
            </div>
        );
    }

    if (error) {
        return <div className="text-rose-500 font-mono text-center mt-10 font-bold h-screen pt-10 uppercase tracking-widest">System Error: {error}</div>;
    }

    return (
        <div className="p-6 min-h-screen font-sans selection:bg-cyan-500/30">
            <div className="max-w-4xl mx-auto mt-8">
                
                {/* Page Header */}
                <div className="border-b border-cyan-500/30 pb-4 mb-8">
                    <h2 className="text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] uppercase font-mono">
                        Sys_Analysis_Dashboard
                    </h2>
                    <p className="text-slate-500 font-mono text-sm tracking-widest mt-2 uppercase">
                        Visualizing Cryptocurrency Market Capitalization Trajectories
                    </p>
                </div>
                
                {/* Rendering the Chart Component */}
                <MarketChart />
                
            </div>
        </div>
    );
};

export default Analysis;