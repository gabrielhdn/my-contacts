import {
  useEffect, useState, useImperativeHandle,
} from 'react';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import CategoryService from '../../services/CategoryService';

import useErrors from '../../hooks/useErrors';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

export default function useContactForm(onSubmit, ref) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [areCategoriesLoading, setAreCategoriesLoading] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  const isCategoryTheOnlyError = errors.length === 1 && errors[0].field === 'category';
  const isFormValid = (name && (!errors.length || isCategoryTheOnlyError));

  useImperativeHandle(ref, () => ({
    setFormValues: (contact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone ?? ''));
      setCategoryId(contact.category.id ?? '');
    },
    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), []);

  useEffect(() => {
    // controller para cancelar requisições decorrentes do Strict Mode (React 18)
    const controller = new AbortController();

    async function fetchCategories() {
      try {
        const categoriesList = await CategoryService.getCategories(controller.signal);

        removeError('category');
        setCategories(categoriesList.sort((a, b) => a.name < b.name));
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') return;

        setError({ field: 'category', message: 'We had a problem loading categories.' });
      } finally {
        setAreCategoriesLoading(false);
      }
    }

    fetchCategories();

    return () => controller.abort();
  }, [setCategories, setAreCategoriesLoading]); // eslint-disable-line

  const handleNameChange = (e) => {
    setName(e.target.value);

    if (!e.target.value) {
      setError({ field: 'name', message: 'Name is required.' });
    } else {
      removeError('name');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    if (e.target.value && !isEmailValid(e.target.value)) {
      setError({ field: 'email', message: 'Invalid e-mail.' });
    } else {
      removeError('email');
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    // finally é executado depois do resultado da promise
    onSubmit({
      name,
      email,
      phone,
      categoryId,
    }).finally(() => setIsSubmitting(false));
  };

  return {
    handleSubmit,
    getErrorMessageByFieldName,
    name,
    handleNameChange,
    isSubmitting,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    areCategoriesLoading,
    categoryId,
    setCategoryId,
    categories,
    isFormValid,
  };
}
