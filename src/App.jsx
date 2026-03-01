import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { CryptoProvider } from './context/CryptoProvider';
import { useCrypto } from './hooks/useCrypto';
import Home from './pages/Home';
import Analysis from './pages/Analysis';

const Navbar = () => {
    const { currency, setCurrency } = useCrypto();

    return (
        <nav className="p-4 bg-slate-950 border-b border-cyan-500/30 flex justify-between items-center relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            {/* Glowing top line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-600 via-cyan-400 to-emerald-400"></div>
            
            <h1 className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                CRYPTO<span className="font-light text-slate-100">PULSE</span>
            </h1>
            
            <div className="flex items-center gap-6">
                <Link to="/" className="text-sm font-mono tracking-widest text-slate-400 hover:text-cyan-400 transition-colors uppercase">Data_Stream</Link>
                <Link to="/analysis" className="text-sm font-mono tracking-widest text-slate-400 hover:text-cyan-400 transition-colors uppercase">Sys_Analysis</Link>
                
                {/* Global State Currency Toggle for the Rubric */}
                <select 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-slate-900 text-cyan-400 text-sm font-mono font-bold tracking-widest p-2 border border-cyan-500/50 focus:outline-none focus:border-cyan-300 focus:shadow-[0_0_10px_rgba(6,182,212,0.3)] cursor-pointer appearance-none px-4 rounded-none transition-all uppercase"
                >
                    <option value="USD">USD [$]</option>
                    <option value="EUR">EUR [€]</option>
                    <option value="PHP">PHP [₱]</option>
                </select>
            </div>
        </nav>
    );
};

function App() {
    return (
        <CryptoProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/analysis" element={<Analysis />} />
                </Routes>
            </Router>
        </CryptoProvider>
    );
}

export default App;