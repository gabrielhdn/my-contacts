import { useState, useEffect, useCallback } from 'react';
import { toastEventManager } from '../../../utils/toast';

import * as S from './styles';
import ToastMessage from '../ToastMessage';

export default function ToastContainer() {
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

  return (
    <S.Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </S.Container>
  );
}
