import {
  useEffect, useMemo, useState, useCallback, useDeferredValue,
} from 'react';

import toast from '../../utils/toast';
import ContactService from '../../services/ContactService';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredContacts = useMemo(() => contacts.filter(
    ({ name }) => name.toLowerCase().includes(deferredSearchTerm.toLowerCase()),
  ), [contacts, deferredSearchTerm]);

  const fetchContacts = useCallback(async (signal) => {
    try {
      setIsLoading(true);

      const contactsList = await ContactService.getContacts(orderBy, signal);

      setHasError(false);
      setContacts(contactsList);
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return;

      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    // controller para cancelar requisições decorrentes do Strict Mode (React 18)
    const controller = new AbortController();

    fetchContacts(controller.signal);

    return () => controller.abort();
  }, [fetchContacts]); // só executa quando fetchContacts for recriada (quando orderBy muda)

  const handleOrderByToggle = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }, []);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTryAgain = () => {
    fetchContacts();
  };

  const handleOpenDeleteModal = useCallback((contact) => {
    setContactBeingDeleted(contact);
    setIsModalVisible(true);
  }, []);

  const handleCloseDeleteModal = () => {
    setIsModalVisible(false);
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
