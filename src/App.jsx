import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { CryptoProvider, useCrypto } from './context/CryptoContext';
import Home from './pages/Home';
import Analysis from './pages/Analysis';

const Navbar = () => {
    const { currency, setCurrency } = useCrypto();

    return (
        <nav className="p-5 bg-indigo-900 text-white flex justify-between shadow-lg items-center">
            <h1 className="text-xl font-bold tracking-widest">CRYPTO-PULSE</h1>
            <div className="flex items-center gap-6">
                <Link to="/" className="hover:text-cyan-400 font-medium">Market</Link>
                <Link to="/analysis" className="hover:text-cyan-400 font-medium">Analysis</Link>
                
                {/* Global State Currency Toggle */}
                <select 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-gray-800 text-white p-2 rounded border border-gray-600 focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="PHP">PHP (₱)</option>
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