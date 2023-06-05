import { useRef } from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactService from '../../services/ContactService';
import toast from '../../utils/toast';

export default function NewContact() {
  const contactFormRef = useRef(null);

  const handleSubmit = async (formData) => {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      await ContactService.createContact(contact);
      contactFormRef.current.resetFields();

      toast({
        type: 'success',
        text: 'Contact successfully created!',
        duration: 5000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Failed to register a new contact!',
        duration: 5000,
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
