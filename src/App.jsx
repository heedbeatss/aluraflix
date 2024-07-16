import { createGlobalStyle, ThemeProvider } from 'styled-components';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import HomePage from './componentes/HomePage'; 
import NewVideoPage from './componentes/NewVideoPage'; 

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: ${(props) => props.theme.colors.secondary}; 
    color: ${(props) => props.theme.colors.text}; 
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: 400;
    margin: 1rem 0;
  }
  p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  a {
    color: ${(props) => props.theme.colors.primary}; // Cor vibrante
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  button {
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
  }
  .video-card {
    width: 300px;
  }
  .card-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
`;

const theme = {
  colors: {
    primary: '#8a2be2', 
    secondary: '#1c1c1c', 
    text: '#ffffff', 
    highlight: '#a64dff', 
    headerBg: '#2e2e2e', 
    headerText: '#000000', 
  },
  font: {
    family: 'Montserrat', 
    size: {
      small: '10x',
      medium: '12px',
      large: '14px',
    },
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}> 
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new-video" element={<NewVideoPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;