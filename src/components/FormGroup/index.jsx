import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import * as S from './styles';
import failedLoading from '../../assets/images/failedLoading.svg';

export default function FormGroup({
  children, error, isLoading,
}) {
  return (
    <S.Container>
      <div className="form-item">
        {children}

        {isLoading && (
          // div que recebe as regras de posicionamento do spinner
          <div className="loader">
            <Spinner size={16} />
          </div>
        )}
      </div>

      {error && (
      <div className="error-container">
        <small>{error}</small>
        {error.includes('categories') && <img src={failedLoading} alt="Failed loading" />}
      </div>
      )}
    </S.Container>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};

FormGroup.defaultProps = {
  error: null,
  isLoading: false,
};
