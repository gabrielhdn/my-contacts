import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as S from './styles';
import formatPhone from '../../../../utils/formatPhone';

import arrowIcon from '../../../../assets/images/icons/arrow.svg';
import editIcon from '../../../../assets/images/icons/notepad.svg';
import deleteIcon from '../../../../assets/images/icons/rubbishbin.svg';

export default function ContactsList({
  orderBy,
  onOrderByToggle,
  onOpenDeleteModal,
  filteredContacts,
}) {
  return (
    <>
      {filteredContacts.length > 0 && (
        <S.ListHeader orderBy={orderBy}>
          <button
            type="button"
            onClick={onOrderByToggle}
          >
            <span>Name</span>
            <img src={arrowIcon} alt="Arrow" />
          </button>
        </S.ListHeader>
      )}

      {filteredContacts.map((contact) => (
        <S.Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category.name && (
              <small>{contact.category.name}</small>
              )}
            </div>
            <span>{contact.email}</span>
            <span>{formatPhone(contact.phone)}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={editIcon} alt="Edit Icon" />
            </Link>
            <button
              type="button"
              onClick={() => onOpenDeleteModal(contact)}
            >
              <img src={deleteIcon} alt="Delete Icon" />
            </button>
          </div>
        </S.Card>
      ))}
    </>
  );
}

ContactsList.propTypes = {
  orderBy: PropTypes.string.isRequired,
  onOrderByToggle: PropTypes.func.isRequired,
  onOpenDeleteModal: PropTypes.func.isRequired,
  filteredContacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
};
