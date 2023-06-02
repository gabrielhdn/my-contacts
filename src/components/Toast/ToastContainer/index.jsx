import { useState, useEffect } from 'react';
import * as S from './styles';
import ToastMessage from '../ToastMessage';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  // listener que monitora o disparo de 'addtoast' em qualquer lugar da aplicação
  useEffect(() => {
    function handleAddToast(e) {
      const { type, text } = e.detail;

      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    }

    document.addEventListener('addtoast', handleAddToast);

    return () => {
      document.removeEventListener('addtoast', handleAddToast);
    };
  }, []);

  return (
    <S.Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          type={message.type}
          text={message.text}
        />
      ))}
    </S.Container>
  );
}
