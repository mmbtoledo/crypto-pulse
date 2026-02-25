import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useCrypto } from '../context/CryptoContext';

const MarketChart = () => {
    const { coins, currency } = useCrypto();
    
    // Transform raw JSON into Chart-friendly data
    const chartData = coins.map(coin => ({
        name: coin.symbol.toUpperCase(),
        price: coin.current_price
    }));

    return (
        <div className="h-80 w-full p-4 bg-gray-800/60 rounded-xl mt-6 border border-gray-700/50 backdrop-blur-sm shadow-lg">
            <h2 className="text-white mb-4 font-bold tracking-wide">Price Comparison ({currency})</h2>
            <ResponsiveContainer>
                <LineChart data={chartData}>
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                        contentStyle={{backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px'}} 
                        itemStyle={{color: '#22d3ee', fontWeight: 'bold'}}
                    />
                    {/* Refactored from Bar to Line for financial look */}
                    <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#22d3ee" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: '#1e293b', stroke: '#22d3ee', strokeWidth: 2 }} 
                        activeDot={{ r: 7, fill: '#22d3ee' }} 
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MarketChart;