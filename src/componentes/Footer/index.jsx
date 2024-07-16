import React from 'react';
import { Container, Typography } from '@mui/material'; 
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: ${(props) => props.theme.colors.secondary}; 
  color: ${(props) => props.theme.colors.text};
  position: fixed;  
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  text-align: center;
`;

const Footer = () => {
  return (
    <StyledFooter className="footer">
      <Typography variant="body2" align="center" className="footer-text">
          Feito por André Moreno - LearnPlay 2024.
      </Typography>
    </StyledFooter>
  );
};

export default Footer;
