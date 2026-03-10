import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useCrypto } from '../hooks/useCrypto';

const MarketChart = () => {
    const { coins, currency } = useCrypto();
    
    // State to toggle between chart types
    const [chartType, setChartType] = useState('line'); 
    
    const chartData = coins.map(coin => ({
        name: coin.symbol.toUpperCase(),
        price: coin.current_price
    }));

    // Shows a loading message inside the chart area if data hasn't arrived yet
    if (!coins || coins.length === 0) {
        return <div className="text-cyan-400 font-mono text-center p-10 animate-pulse">AWAITING MARKET DATA...</div>;
    }

    return (
        <div className="h-[28rem] w-full p-4 sm:p-6 bg-slate-900 rounded-lg mt-6 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] relative overflow-hidden flex flex-col">
            {/* Digital grid background effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 z-10 relative">
                <h2 className="text-cyan-400 font-bold tracking-widest uppercase text-sm drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                    MARKET TRAJECTORY ({currency})
                </h2>
                
                {/* --- THE TOGGLE BUTTONS --- */}
                <div className="flex gap-2 w-full sm:w-auto">
                    <button 
                        onClick={() => setChartType('line')}
                        className={`flex-1 sm:flex-none px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest transition-colors border ${chartType === 'line' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'bg-slate-800 text-slate-500 border-slate-700 hover:text-cyan-400 hover:border-cyan-700'}`}
                    >
                        Line
                    </button>
                    <button 
                        onClick={() => setChartType('bar')}
                        className={`flex-1 sm:flex-none px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest transition-colors border ${chartType === 'bar' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'bg-slate-800 text-slate-500 border-slate-700 hover:text-emerald-400 hover:border-emerald-700'}`}
                    >
                        Bar
                    </button>
                </div>
            </div>
            
            <div className="flex-grow z-10 relative">
                <ResponsiveContainer width="100%" height="100%">
                    {/* Conditionally render the chosen chart */}
                    {chartType === 'line' ? (
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
                    ) : (
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#10b981', fontSize: 12}} />
                            <YAxis stroke="#64748b" tick={{fill: '#10b981', fontSize: 12}} />
                            <Tooltip 
                                contentStyle={{backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid #10b981', borderRadius: '4px', color: '#fff', fontFamily: 'monospace'}} 
                                itemStyle={{color: '#10b981', fontWeight: 'bold'}}
                                cursor={{fill: 'rgba(16, 185, 129, 0.1)'}}
                            />
                            <Bar 
                                dataKey="price" 
                                fill="#10b981" 
                                radius={[4, 4, 0, 0]} 
                            />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MarketChart;