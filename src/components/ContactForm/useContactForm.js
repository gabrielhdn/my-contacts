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
  const [categoryError, setCategoryError] = useSafeAsyncState(null);
  const [areCategoriesLoading, setAreCategoriesLoading] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (name && !errors.length);

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
    async function fetchCategories() {
      try {
        const categoriesList = await CategoryService.getCategories();

        setCategoryError(null);
        setCategories(categoriesList);
      } catch {
        setCategoryError('We had a problem loading categories.');
      } finally {
        setAreCategoriesLoading(false);
      }
    }

    fetchCategories();
  }, [setCategoryError, setCategories, setAreCategoriesLoading]);

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
    categoryError,
    areCategoriesLoading,
    categoryId,
    setCategoryId,
    categories,
    isFormValid,
  };
}
