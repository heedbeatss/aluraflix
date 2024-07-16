import React from 'react';
import { Container, Typography, Grid } from '@mui/material'; 
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  background-color: ${(props) => props.theme.colors.secondary};
  margin: none;
  padding: none;
  text-align: center;
  width: 100%; 
`;

const StyledBannerImage = styled.img`
  width: 40%; 
  max-height: 100vh;
  border-radius: 4%;
  margin: 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const Banner = () => {
  return (
    <StyledContainer maxWidth="false" className="banner"> {/* Remova maxWidth="md" */}
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} sm={12} md={12}>
          <StyledBannerImage src="/banner.jpg" alt="Banner de Destaque" className="banner-image" /> 
          <Typography variant="h4" align="center" className="banner-text">
            Assista o material que vai dar um up no seu conhecimento!
          </Typography>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Banner;