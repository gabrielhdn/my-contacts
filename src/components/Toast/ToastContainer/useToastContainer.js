import { useState, useEffect, useCallback } from 'react';
import { toastEventManager } from '../../../utils/toast';

export default function useToastContainer() {
  const [messages, setMessages] = useState([]);

  // listener que monitora o disparo de 'addtoast' em qualquer lugar da aplicação
  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(), type, text, duration,
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id) => {
    setMessages((prevState) => prevState.filter(
      (message) => message.id !== id,
    ));
  }, []);

  return { messages, handleRemoveMessage };
}
