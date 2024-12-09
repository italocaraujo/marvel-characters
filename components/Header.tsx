import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  background-color: #f5f5f5;
  
  h1 {
    display: flex;
    align-items: center;
    font-size: 24px;
    color: #333;
    margin: 0;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: inherit;

      &:hover {
        text-decoration: underline;
      }
    }

    .header-img {
        border-radius: 0;
    }

  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <h1>
        <Image className="header-img" src="/assets/marvel.png" alt="Marvel" width={100} height={40} />
        &nbsp; Characters
      </h1>
    </HeaderContainer>
  );
};

export default Header;
