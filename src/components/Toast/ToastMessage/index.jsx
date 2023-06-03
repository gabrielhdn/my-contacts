import PropTypes from 'prop-types';
import * as S from './styles';
import errorCircle from '../../../assets/images/icons/x-circle.svg';
import successCircle from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({ message, onRemoveMessage }) {
  const handleRemoveToast = () => {
    onRemoveMessage(message.id);
  };

  return (
    <S.Container
      type={message.type}
      onClick={handleRemoveToast}
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
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
};
