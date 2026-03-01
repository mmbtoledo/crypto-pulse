import { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext.js';

export const useCrypto = () => useContext(CryptoContext);
