import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: 2;
  bottom: 48px;
  left: 50%; // margem de 50% na esquerda
  transform: translateX(-50%) // compensação para centralizar o elemento (50% do tamanho dele)
`;
