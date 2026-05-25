import { useState } from "react";

export function useLocalStorage(key, defaultValue = null) {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key);
        return stored !== null ? stored : defaultValue;
    });

    const updateValue = (newValue) => {
        localStorage.setItem(key, newValue);
        setValue(newValue);
    };

    const removeValue = () => {
        localStorage.removeItem(key);
        setValue(defaultValue);
    };

    return [
        value,
        updateValue,
        removeValue,
    ];
}