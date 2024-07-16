import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from '../EditModal';
import useApiService from '../Api/useApiService';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); // Sombra suave
`;

const StyledCardMedia = styled(CardMedia)`
  height: 140px;
  border-radius: 10px 10px 0 0; // Borda arredondada em cima
`;

const StyledCardContent = styled(CardContent)`
  padding: 15px;
`;

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.primary}; // Cor vibrante
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  &:hover {
    background-color: ${(props) => props.theme.colors.highlight}; // Cor mais escura ao passar o mouse
  }
`;

const VideoCard = ({ video }) => {
  const [showModal, setShowModal] = useState(false);

  const { updateVideo, deleteVideo } = useApiService();

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleDelete = async () => {
    await deleteVideo(video.id);
  };

  return (
    <StyledCard className="video-card">
      <StyledCardMedia
        component="img"
        alt={video.title}
        image="/learnPlay.png"
        title={video.title}
      />
      <StyledCardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {video.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {video.description}
        </Typography>

        {/* Mostrar o botão "Assistir" para todos os vídeos */}
        <Link to={video.videoLink} target="_blank" rel="noopener noreferrer">
          <StyledButton variant="contained" color="primary">
            Assistir
          </StyledButton>
        </Link>

        <div className="card-actions">
          <IconButton aria-label="edit" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </div>

        {showModal && (
          <EditModal
            video={video}
            onClose={() => setShowModal(false)}
            onUpdateVideo={onUpdateVideo}
          />
        )}
      </StyledCardContent>
    </StyledCard>
  );
};

export default VideoCard;