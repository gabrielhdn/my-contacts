import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';
import ContactService from '../../services/ContactService';
import toast from '../../utils/toast';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const { id } = useParams();
  const history = useHistory();
  const contactFormRef = useRef(null);

  useEffect(() => {
    async function getContact() {
      try {
        const contact = await ContactService.getContactById(id);
        contactFormRef.current.setFormValues(contact);

        setContactName(contact.name);
        setIsLoading(false);
      } catch (e) {
        history.push('/');
        toast({
          type: 'danger',
          text: 'Contact not found!',
          duration: 7000,
        });
      }
    }

    getContact();
  }, [id, history]);

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
