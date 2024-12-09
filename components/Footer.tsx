import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  margin-top: 40px;

  p {
    margin: 5px 0;
    font-size: 14px;
    color: #666;
  }

  a {
    color: #e62429;
    text-decoration: none;
    margin: 0 10px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <p>
        &copy; {new Date().getFullYear()} Desenvolvido por <strong>Italo Correia</strong>
      </p>
      <p>
        <a href="https://github.com/italocaraujo" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        |
        <a href="https://www.linkedin.com/in/italocaraujo" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        |
        <a href="https://italocaraujo.vercel.app" target="_blank" rel="noopener noreferrer">
          Portfólio
        </a>
      </p>
    </FooterContainer>
  );
};

export default Footer;
