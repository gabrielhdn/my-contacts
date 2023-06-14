import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import ContactService from '../../services/ContactService';
import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function useEditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const contactFormRef = useRef(null);
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    // controller para cancelar requisições decorrentes do Strict Mode (React 18)
    const controller = new AbortController();

    async function getContact() {
      try {
        const contact = await ContactService.getContactById(id, controller.signal);

        // impede que o código execute se o componente tiver sido desmontado
        safeAsyncAction(() => {
          contactFormRef.current.setFormValues(contact);
          setContactName(contact.name);
          setIsLoading(false);
        });
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') return;

        safeAsyncAction(() => {
          navigate('/', { replace: true });
          toast({
            type: 'danger',
            text: 'Contact not found!',
            duration: 5000,
          });
        });
      }
    }

    getContact();

    return () => controller.abort();
  }, [id, navigate, safeAsyncAction]);

  const handleSubmit = async (contact) => {
    try {
      const updatedContact = await ContactService.updateContact(id, contact);
      setContactName(updatedContact.name);

      toast({
        type: 'success',
        text: 'Contact successfully updated!',
        duration: 5000,
      });
    } catch (e) {
      toast({
        type: 'danger',
        text: e.message.includes('e-mail')
          ? e.message
          : 'Failed to register a new contact!',
        duration: 5000,
      });
    }
  };

  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
