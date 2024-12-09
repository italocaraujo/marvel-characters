import styled, { keyframes } from 'styled-components';

// Animação para o spinner
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Estilo do spinner
const Loader = styled.div`
  border: 4px solid #f3f3f3; /* Cor de fundo */
  border-top: 4px solid #e62429; /* Cor principal */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto;
`;

export default Loader;
