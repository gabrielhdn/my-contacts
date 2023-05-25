import PropTypes from 'prop-types';
import * as S from './styles';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

export default function ContactForm({ buttonLabel }) {
  return (
    <S.Form>
      <FormGroup>
        <Input placeholder="Name" />
      </FormGroup>

      <FormGroup>
        <Input placeholder="E-mail" />
      </FormGroup>

      <FormGroup>
        <Input placeholder="Phone" />
      </FormGroup>

      <FormGroup>
        <Select>
          <option value="instagram">Instagram</option>
        </Select>
      </FormGroup>

      <S.ButtonContainer>
        <Button type="submit">
          {buttonLabel}
        </Button>
      </S.ButtonContainer>
    </S.Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
