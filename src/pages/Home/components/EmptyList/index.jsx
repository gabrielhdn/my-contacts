/* eslint-disable react/jsx-one-expression-per-line */

import emptyBox from '../../../../assets/images/emptyBox.svg';
import * as S from './styles';

export default function EmptyList() {
  return (
    <S.Container>
      <img src={emptyBox} alt="Empty box" />
      <p>
        You don&apos;t have any registered contacts.
        Click <strong>&quot;New contact&quot;</strong> to create your first one!
      </p>
    </S.Container>
  );
}
