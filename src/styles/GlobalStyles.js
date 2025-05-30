import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: all 0.3s;
  }
  html{
    font-size: 10px;
  }
 
  :root{
    --padding-top : 216px ;
    --big-text: 5.2rem ; 
    --normal-text: 2.4rem; 
    --small-text: 20px; 
    --min-text: 1.6rem; 
    @media (max-width: 768px){
      --big-text: 2.4rem ; 
      --normal-text: 1.6rem; 
      --small-text: 16px; 
      --min-text: 1.2rem; 
      
    }
    @media (min-width: 769px) and (max-width: 992px){
      --big-text: 2.8rem ; 
      --normal-text: 1.8rem; 
      --small-text: 16px; 
      --min-text: 1.4rem; 

    }
  }
`;