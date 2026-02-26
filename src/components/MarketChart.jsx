import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useCrypto } from '../context/CryptoContext';

const MarketChart = () => {
    const { coins, currency } = useCrypto();
    
    const chartData = coins.map(coin => ({
        name: coin.symbol.toUpperCase(),
        price: coin.current_price
    }));

    return (
        <div className="h-80 w-full p-4 bg-slate-900 rounded-lg mt-6 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] relative overflow-hidden">
            {/* Digital grid background effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
            
            <h2 className="text-cyan-400 mb-4 font-bold tracking-widest uppercase text-sm z-10 relative drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                MARKET TRAJECTORY ({currency})
            </h2>
            
            <ResponsiveContainer className="z-10 relative">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#06b6d4', fontSize: 12}} />
                    <YAxis stroke="#64748b" tick={{fill: '#06b6d4', fontSize: 12}} />
                    <Tooltip 
                        contentStyle={{backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid #06b6d4', borderRadius: '4px', color: '#fff', fontFamily: 'monospace'}} 
                        itemStyle={{color: '#06b6d4', fontWeight: 'bold'}}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#06b6d4" 
                        strokeWidth={2} 
                        dot={{ r: 3, fill: '#0f172a', stroke: '#06b6d4', strokeWidth: 2 }} 
                        activeDot={{ r: 6, fill: '#06b6d4', stroke: '#fff' }} 
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MarketChart;