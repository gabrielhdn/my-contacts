import { Link } from 'react-router-dom';
import * as S from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import editIcon from '../../assets/images/icons/notepad.svg';
import deleteIcon from '../../assets/images/icons/rubbishbin.svg';
import Modal from '../../components/Modal';

export default function Home() {
  return (
    <S.Container>
      <Modal danger />

      <S.InputSearchContainer>
        <input type="text" placeholder="Search for a contact" />
      </S.InputSearchContainer>

      <S.Header>
        <strong>X contacts</strong>
        <Link to="/new">New contact</Link>
      </S.Header>

      <S.ListContainer>
        <header>
          <button type="button">
            <span>Name</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>

        <S.Card>
          <div className="info">
            <div className="contact-name">
              <strong>Gabriel Herdina</strong>
              <small>instagram</small>
            </div>
            <span>gherdina7@gmail.com</span>
            <span>(41) 99699-1762</span>
          </div>

          <div className="actions">
            <Link to="/edit/123">
              <img src={editIcon} alt="Edit Icon" />
            </Link>
            <button type="button">
              <img src={deleteIcon} alt="Delete Icon" />
            </button>
          </div>
        </S.Card>
      </S.ListContainer>
    </S.Container>
  );
}
