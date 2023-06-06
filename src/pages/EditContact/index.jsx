import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';

import ContactService from '../../services/ContactService';
import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const { id } = useParams();
  const history = useHistory();
  const contactFormRef = useRef(null);
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function getContact() {
      try {
        const contact = await ContactService.getContactById(id);

        // impede que o código execute se o componente tiver sido desmontado
        safeAsyncAction(() => {
          contactFormRef.current.setFormValues(contact);
          setContactName(contact.name);
          setIsLoading(false);
        });
      } catch {
        safeAsyncAction(() => {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contact not found!',
            duration: 5000,
          });
        });
      }
    }

    getContact();
  }, [id, history, safeAsyncAction]);

  const handleSubmit = async (formData) => {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      const updatedContact = await ContactService.updateContact(id, contact);
      setContactName(updatedContact.name);

      toast({
        type: 'success',
        text: 'Contact successfully updated!',
        duration: 5000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Failed to update this contact!',
        duration: 5000,
      });
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader
        title={
          isLoading
            ? 'Loading...'
            : `Editing → ${contactName}`
        }
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Save changes"
        onSubmit={handleSubmit}
      />
    </>
  );
}
