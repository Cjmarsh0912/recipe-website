import { useEffect, MutableRefObject } from 'react';

// custom hook for detecting when you click outside of an element and running a function as a result
export const useOutsideClick = (
  ref: MutableRefObject<HTMLElement | null>,
  callback: () => void
) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]);
};
