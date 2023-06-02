import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import * as S from './styles';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';
import CategoryService from '../../services/CategoryService';

export default function ContactForm({ buttonLabel, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState(null);
  const [areCategoriesLoading, setAreCategoriesLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (name && !errors.length);

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
  }, []);

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

    onSubmit({
      name,
      email,
      phone,
      categoryId,
    }).finally(() => setIsSubmitting(false));

    // finally é executado depois do resultado da promise
  };

  return (
    <S.Form
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off" // not working (?)
    >
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Name *"
          value={name}
          onChange={handleNameChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          error={getErrorMessageByFieldName('email')}
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <Input
          maxLength={15}
          placeholder="Phone"
          value={phone}
          onChange={handlePhoneChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup
        categoryError={categoryError}
        isLoading={areCategoriesLoading}
      >
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={areCategoriesLoading || isSubmitting}
        >
          <option value="">No category</option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <S.ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </S.ButtonContainer>
    </S.Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
