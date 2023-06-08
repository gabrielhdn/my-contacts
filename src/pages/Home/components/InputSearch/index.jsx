import PropTypes from 'prop-types';
import * as S from './styles';

export default function InputSearch({ value, onChange }) {
  return (
    <S.Container>
      <input
        value={value}
        type="text"
        placeholder="Search for a contact"
        onChange={onChange}
      />
    </S.Container>
  );
}

InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
