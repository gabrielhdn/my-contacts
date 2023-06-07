import { useRef } from 'react';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

import ContactService from '../../services/ContactService';
import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function NewContact() {
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
    } catch {
      safeAsyncAction(() => {
        toast({
          type: 'danger',
          text: 'Failed to register a new contact!',
          duration: 5000,
        });
      });
    }
  };

  return (
    <>
      <PageHeader
        title="New Contact"
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Register"
        onSubmit={handleSubmit}
      />
    </>
  );
}
