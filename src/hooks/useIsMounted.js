// verifica se o componente está montado

import { useEffect, useRef, useCallback } from 'react';

export default function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  // pega sempre o valor atualizado de current
  const getIsMounted = useCallback(() => isMounted.current, []);

  return getIsMounted;
}
