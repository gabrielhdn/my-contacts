import {
  useEffect, useMemo, useState, useCallback,
} from 'react';

import toast from '../../utils/toast';
import ContactService from '../../services/ContactService';

export default function useHome() {
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

  return {
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
  };
}
