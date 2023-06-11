import * as S from './styles';
import ToastMessage from '../ToastMessage';
import useToastContainer from './useToastContainer';

export default function ToastContainer() {
  const {
    handleRemoveItem,
    renderList,
  } = useToastContainer();

  return (
    <S.Container>
      {renderList((message, { isClosing, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isClosing={isClosing}
          animatedRef={animatedRef}
        />
      ))}
    </S.Container>
  );
}
