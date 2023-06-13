import PropTypes from 'prop-types';
import { useEffect, memo } from 'react';

import errorCircle from '../../../assets/images/icons/x-circle.svg';
import successCircle from '../../../assets/images/icons/check-circle.svg';
import * as S from './styles';

function ToastMessage({
  message, onRemoveMessage, isClosing, animatedRef,
}) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 5000);

    return () => clearTimeout(timeoutId);
  }, [message, onRemoveMessage]);

  const handleRemoveToast = () => {
    onRemoveMessage(message.id);
  };

  return (
    <S.Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0} // torna o elemento acessível pelo tab
      role="button" // leitores de tela entendem que o elemento é clicável
      isClosing={isClosing}
      ref={animatedRef}
    >
      {message.type === 'danger' && <img src={errorCircle} alt="X" />}
      {message.type === 'success' && <img src={successCircle} alt="Check" />}

      <strong>{message.text}</strong>
    </S.Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  isClosing: PropTypes.bool.isRequired,
  animatedRef: PropTypes.shape().isRequired,
};

export default memo(ToastMessage);
