import { useRef } from 'react';

import ContactService from '../../services/ContactService';
import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function useNewContact() {
  const contactFormRef = useRef(null);
  const safeAsyncAction = useSafeAsyncAction();

  const handleSubmit = async (contact) => {
    try {
      await ContactService.createContact(contact);

      // só acontece se o componente estiver montado
      safeAsyncAction(() => {
        contactFormRef.current.resetFields();

        toast({
          type: 'success',
          text: 'Contact successfully created!',
          duration: 5000,
        });
      });
    } catch (e) {
      safeAsyncAction(() => {
        toast({
          type: 'danger',
          text: e.message.includes('e-mail')
            ? e.message
            : 'Failed to register a new contact!',
          duration: 5000,
        });
      });
    }
  };

  return { contactFormRef, handleSubmit };
}
