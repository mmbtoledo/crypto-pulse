import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
    // 1. Get initial value from local storage, or use the default
    const [value, setValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error reading localStorage", error);
            return initialValue;
        }
    });

    // 2. Update local storage whenever the state changes
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error setting localStorage", error);
        }
    }, [key, value]);

    return [value, setValue];
};