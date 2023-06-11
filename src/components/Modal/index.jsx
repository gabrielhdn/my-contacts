import PropTypes from 'prop-types';

import * as S from './styles';
import Button from '../Button';
import ReactPortal from '../ReactPortal';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

export default function Modal({
  danger,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  visible,
  isLoading,
}) {
  // necessário para a animação de saída do componente
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);

  // sem animação, poderíamos utilizar !visible direto
  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <S.Overlay
        ref={animatedElementRef}
        isClosing={!visible}
      >
        <S.Container
          danger={danger}
          isClosing={!visible}
        >
          <h1>{title}</h1>

          <div className="modal-body">
            {children}
          </div>

          <S.Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              type="button"
              danger={danger}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </S.Footer>
        </S.Container>
      </S.Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm',
  isLoading: false,
};
