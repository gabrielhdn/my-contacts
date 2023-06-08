/* eslint-disable react/jsx-one-expression-per-line */

import PropTypes from 'prop-types';
import notFoundMagnifier from '../../../../assets/images/magnifier.svg';
import * as S from './styles';

export default function SearchNotFound({ searchTerm }) {
  return (
    <S.Container>
      <img src={notFoundMagnifier} alt="Not found magnifier" />
      <span>No results were found for <strong>&quot;{searchTerm}&quot;</strong>.</span>
    </S.Container>
  );
}

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
