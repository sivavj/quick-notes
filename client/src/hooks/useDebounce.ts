import { useState, useEffect } from "react";

/**
 * Custom hook for debouncing a value.
 * @param value The value to debounce
 * @param delay The debounce delay in milliseconds (default: 300ms)
 */
const useDebounce = <T>(value: T, delay = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // Cleanup the timeout
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
