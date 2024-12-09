import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5;
    color: #333;
  }

  .container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  .title-main-page {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyles;
