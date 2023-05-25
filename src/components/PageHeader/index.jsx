import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as S from './styles';
import arrow from '../../assets/images/icons/arrow.svg';

export default function PageHeader({ title }) {
  return (
    <S.Container>
      <Link to="/">
        <img src={arrow} alt="Back" />
        <span>Back</span>
      </Link>
      <h1>{title}</h1>
    </S.Container>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
