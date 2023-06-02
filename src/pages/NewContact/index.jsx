import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactService from '../../services/ContactService';
import toast from '../../utils/toast';

export default function NewContact() {
  const handleSubmit = async (formData) => {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      await ContactService.createContact(contact);

      toast({
        type: 'success',
        text: 'Contact successfully created!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Failed to register a new contact!',
      });
    }
  };

  return (
    <>
      <PageHeader
        title="New Contact"
      />

      <ContactForm
        buttonLabel="Register"
        onSubmit={handleSubmit}
      />
    </>
  );
}
