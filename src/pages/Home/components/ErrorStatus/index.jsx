import PropTypes from 'prop-types';

import sadFace from '../../../../assets/images/sadFace.svg';
import Button from '../../../../components/Button';
import * as S from './styles';

export default function ErrorStatus({ onTryAgain }) {
  return (
    <S.Container>
      <img src={sadFace} alt="Error Icon" />
      <div className="details">
        <strong>An error has occurred while trying to obtain your contacts!</strong>
        <Button
          type="button"
          onClick={onTryAgain}
        >
          Try again
        </Button>
      </div>
    </S.Container>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
};
