import React, { useState, useEffect } from 'react';
import useApiService from '../Api/useApiService';
import Header from '../Header';
import Banner from '../Banner';
import VideoCard from '../VideoCard';
import Footer from '../Footer';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px; 
`;

const StyledSection = styled.section`
  margin-bottom: 20px; 
  width: 100%;
`;

const StyledH2 = styled.h2`
  font-weight: bold; 
  color: ${(props) => props.theme.colors.primary}; // Cor vibrante principal
  text-align: center;
  margin-bottom: 10px;
`;

const StyledVideoCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const { getVideos, updateVideo, deleteVideo } = useApiService(); 

  useEffect(() => {
    const fetchVideos = async () => {
      const fetchedVideos = await getVideos(); 
      setVideos(fetchedVideos);
    };

    fetchVideos();
  }, [videos]);

  return (
    <StyledContainer>
      <Header />
      <Banner />
      <StyledSection>
        <StyledH2>Front-end</StyledH2>
        <StyledVideoCardsContainer>
          {videos
            .filter((video) => video.category === 'frontend')
            .map ((video) =>
              (<VideoCard 
                  key={video.id} 
                  video={video} 
                  onUpdateVideo={updateVideo} 
                  onDeleteVideo={deleteVideo} 
                /> 
            ))}
        </StyledVideoCardsContainer>
      </StyledSection>
      <StyledSection>
        <StyledH2>Back-end</StyledH2>
        <StyledVideoCardsContainer>
        {videos
            .filter((video) => video.category === 'backend')
            .map ((video) =>
              (<VideoCard 
                  key={video.id} 
                  video={video} 
                  onUpdateVideo={updateVideo} 
                  onDeleteVideo={deleteVideo} 
                /> 
            ))}
        </StyledVideoCardsContainer>
      </StyledSection>
      <Footer />
    </StyledContainer>
  );
};

export default HomePage;