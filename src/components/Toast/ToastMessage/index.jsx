import PropTypes from 'prop-types';
import * as S from './styles';
import errorCircle from '../../../assets/images/icons/x-circle.svg';
import successCircle from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({ text, type }) {
  return (
    <S.Container type={type}>
      {type === 'danger' && <img src={errorCircle} alt="X" />}
      {type === 'success' && <img src={successCircle} alt="Check" />}

      <strong>{text}</strong>
    </S.Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'success', 'danger']),
};

ToastMessage.defaultProps = {
  type: 'default',
};
