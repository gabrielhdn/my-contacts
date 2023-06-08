/* eslint-disable no-nested-ternary */

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as S from './styles';

export default function Header({ hasError, contactsQty, filteredContactsQty }) {
  const justifyContent = hasError
    ? 'flex-end'
    : (
      contactsQty > 0
        ? 'space-between'
        : 'center'
    );

  return (
    <S.Container justifyContent={justifyContent}>
      {(!hasError && contactsQty > 0) && (
      <strong>
        {filteredContactsQty}
        {' '}
        {filteredContactsQty === 1 ? 'contact' : 'contacts'}
      </strong>
      )}
      <Link to="/new">New contact</Link>
    </S.Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  contactsQty: PropTypes.number.isRequired,
  filteredContactsQty: PropTypes.number.isRequired,
};
