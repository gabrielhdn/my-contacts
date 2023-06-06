import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import * as S from './styles';

export default function Button({
  type, disabled, isLoading, children, danger, onConfirm,
}) {
  return (
    <S.Button
      type={type}
      disabled={disabled || isLoading}
      danger={danger}
      onClick={onConfirm}
    >
      {
        isLoading
          ? <Spinner size={16} />
          : children
      }
    </S.Button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  danger: PropTypes.bool,
  onConfirm: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false,
  danger: false,
  onConfirm: undefined,
};
