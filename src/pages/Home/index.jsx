/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */

import { Link } from 'react-router-dom';
import {
  useEffect, useMemo, useState, useCallback,
} from 'react';

import * as S from './styles';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

import arrowIcon from '../../assets/images/icons/arrow.svg';
import editIcon from '../../assets/images/icons/notepad.svg';
import deleteIcon from '../../assets/images/icons/rubbishbin.svg';
import sadFace from '../../assets/images/sadFace.svg';
import emptyBox from '../../assets/images/emptyBox.svg';
import notFoundMagnifier from '../../assets/images/magnifier.svg';

import formatPhone from '../../utils/formatPhone';
import toast from '../../utils/toast';
import ContactService from '../../services/ContactService';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter(
    ({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()),
  ), [contacts, searchTerm]);

  const fetchContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactService.getContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch (e) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]); // só executa quando fetchContacts for recriada (quando orderBy muda)

  const handleOrderByToggle = () => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTryAgain = () => {
    fetchContacts();
  };

  const handleOpenDeleteModal = (contact) => {
    setContactBeingDeleted(contact);
    setIsModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setIsModalVisible(false);
    setContactBeingDeleted(null);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleteLoading(true);

      await ContactService.deleteContact(contactBeingDeleted.id);

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));
      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'Contact successfully deleted!',
        duration: 5000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Failed to delete this contact!',
        duration: 5000,
      });
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <S.Container>
      <Loader isLoading={isLoading} />

      <Modal
        danger
        title={`Are you sure you want to delete the contact "${contactBeingDeleted?.name}"?`}
        confirmLabel="Delete"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        visible={isModalVisible}
        isLoading={isDeleteLoading}
      >
        <p>This action cannot be undone.</p>
      </Modal>

      {contacts.length > 0 && (
        <S.InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Search for a contact by name"
            onChange={handleSearchTermChange}
          />
        </S.InputSearchContainer>
      )}

      <S.Header
        justifyContent={
          hasError
            ? 'flex-end'
            : (
              contacts.length > 0
                ? 'space-between'
                : 'center'
            )
        }
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {' '}
            {filteredContacts.length === 1 ? 'contact' : 'contacts'}
          </strong>
        )}
        <Link to="/new">New contact</Link>
      </S.Header>

      {hasError && (
        <S.ErrorContainer>
          <img src={sadFace} alt="Error Icon" />
          <div className="details">
            <strong>An error has occurred while trying to obtain your contacts!</strong>
            <Button
              type="button"
              onClick={handleTryAgain}
            >
              Try again
            </Button>
          </div>
        </S.ErrorContainer>
      )}

      {!hasError && (
        <>
          {(contacts.length < 1 && !isLoading) && (
            <S.EmptyListContainer>
              <img src={emptyBox} alt="Empty box" />
              <p>
                You don&apos;t have any registered contacts.
                Click <strong>&quot;New contact&quot;</strong> to create your first one!
              </p>
            </S.EmptyListContainer>
          )}

          {(contacts.length > 0 && filteredContacts.length === 0) && (
            <S.SearchNotFoundContainer>
              <img src={notFoundMagnifier} alt="Not found magnifier" />
              <span>No results were found for <strong>&quot;{searchTerm}&quot;</strong>.</span>
            </S.SearchNotFoundContainer>
          )}

          {filteredContacts.length > 0 && (
          <S.ListHeader orderBy={orderBy}>
            <button
              type="button"
              onClick={handleOrderByToggle}
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
                  onClick={() => handleOpenDeleteModal(contact)}
                >
                  <img src={deleteIcon} alt="Delete Icon" />
                </button>
              </div>
            </S.Card>
          ))}
        </>
      )}
    </S.Container>
  );
}
