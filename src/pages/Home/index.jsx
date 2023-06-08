/* eslint-disable react/jsx-one-expression-per-line */

import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

import useHome from './useHome';
import * as S from './styles';

export default function Home() {
  const {
    isLoading,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDelete,
    isModalVisible,
    isDeleteLoading,
    contacts,
    searchTerm,
    handleSearchTermChange,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleOrderByToggle,
    handleOpenDeleteModal,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !isLoading && !hasContacts;
  const isSearchResultEmpty = hasContacts && filteredContacts.length === 0;

  return (
    <S.Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      )}

      <Header
        hasError={hasError}
        contactsQty={contacts.length}
        filteredContactsQty={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}

      {!hasError && (
        <>
          {isListEmpty && <EmptyList />}

          {isSearchResultEmpty && <SearchNotFound searchTerm={searchTerm} />}

          <ContactsList
            orderBy={orderBy}
            onOrderByToggle={handleOrderByToggle}
            onOpenDeleteModal={handleOpenDeleteModal}
            filteredContacts={filteredContacts}
          />

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
        </>
      )}
    </S.Container>
  );
}
