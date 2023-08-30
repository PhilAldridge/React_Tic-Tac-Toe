import {useRef} from 'react';

export const useEffectEvent = (callback) => {
    const ref = useRef(callback);
  
    ref.current = callback;
  
    return (...args) => {
      ref.current(...args);
    }
  }