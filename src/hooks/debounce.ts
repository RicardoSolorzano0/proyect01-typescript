import { useEffect, useState } from 'react';

// Source: https://blog.logrocket.com/create-custom-debounce-hook-react/
export const useDebounce = <T>(value: T | undefined, milliSeconds = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, milliSeconds);

        return () => {
            clearTimeout(handler);
        };
    }, [value, milliSeconds]);

    return debouncedValue;
};