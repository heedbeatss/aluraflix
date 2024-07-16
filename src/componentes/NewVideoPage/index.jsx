import React, { useState, useCallback, useEffect, useRef } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Container, Typography, TextField, Button, Select, MenuItem, FormControlLabel, Checkbox, Grid, Paper } from '@mui/material';
import useApiService from '../Api/useApiService';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  padding: 20px;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.primary}; // Cor vibrante
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  &:hover {
    background-color: ${(props) => props.theme.colors.highlight}; // Cor mais escura ao passar o mouse
  }
`;

const StyledDropzone = styled.div`
  maxwidth: 100%;
  height: 100px;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  cursor: pointer; /* Muda o cursor para um ponteiro */
  transition: background-color 0.3s ease; /* Transição para o efeito de clique */

  &:hover {
    background-color: #eee; /* Efeito de clique ao passar o mouse */
  }
  
  &.dropzone-active {
    background-color: #e0e0e0; /* Efeito de clique ao arrastar o arquivo */
    border-color: #999; /* Muda a cor da borda ao arrastar */
  }
`;

const NewVideoPage = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('frontend');
  const [image, setImage] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [formType, setFormType] = useState(null); 

  const dropzoneRef = useRef(null); 

  const { createVideo, getVideoThumbnail } = useApiService();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'video/*',
    disabled: false, 
    onDrop: acceptedFiles => {
      setSelectedFile(acceptedFiles[0]);
      setTitle(acceptedFiles[0].name);
    },
  });

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    let videoUrl;
    let image;

    if (formType === 'url') {
      videoUrl = videoLink;
      if (videoLink.includes('youtube')) {
        const videoId = videoLink.split('v=')[1];
        image = await getVideoThumbnail(videoId);
      }
    } else if (formType === 'upload' && selectedFile) {
      // Criar um FormData para enviar o arquivo
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Enviar o arquivo para a API
      const response = await fetch('/api/videos', {
        method: 'POST',
        body: formData
      });

      // Obter a URL do vídeo
      videoUrl = response.url;

      // Definir a imagem (opcional)
      image = videoUrl; 
    }

    const newVideo = {
      title,
      category,
      image,
      videoLink: videoUrl,
      description
    };

    await createVideo(newVideo);

    setTitle('');
    setCategory('frontend');
    setImage('');
    setVideoLink('');
    setDescription('');
    setSelectedFile(null);
    setFormType(null); 
  }, [selectedFile, videoLink, getVideoThumbnail, createVideo, formType]);

  const handleClear = () => {
    setTitle('');
    setCategory('frontend');
    setImage('');
    setVideoLink('');
    setDescription('');
    setSelectedFile(null);
    setFormType(null); 
  };

  const handleFormChange = (type) => {
    setFormType(type);
  };

  const scrollToDropzone = () => {
    dropzoneRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (formType === 'upload') {
      scrollToDropzone(); 
    }
  }, [formType]);

  return (
    <div>
      <Header />
      <Container maxWidth="md" className="new-video-container">
        <Typography variant="h4" align="center" className="new-video-title" style={{ padding: '8px'}} >
          Importar Vídeo
        </Typography>

        {/* Botões para alternar entre os formulários */}
        <div className="form-type-buttons" style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', padding: '8px' }}> 
          <Typography variant="body1" style={{ marginRight: '10px' }}>
            Importe um vídeo usando a URL:
          </Typography>
          <Button onClick={() => handleFormChange('url')} variant={formType === 'url' ? 'contained' : 'outlined'} color="primary">
            URL
          </Button>
          <Typography variant="body1" style={{ marginLeft: '10px', marginRight: '10px' }}>
            Faça upload de um arquivo local:
          </Typography>
          <Button /*onClick={() => handleFormChange('upload')} variant={formType === 'upload' ? 'contained' : 'outlined'}*/ color="primary">
            Upload
          (Em Manutenção)
          </Button>
        </div>

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Paper elevation={5} className={formType === 'url' ? '' : 'disabled-form'}>
              <form onSubmit={handleSubmit} className="new-video-form">
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  label="Título"
                  type="text"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={formType !== 'url'} 
                />
                <TextField
                  margin="dense"
                  id="image"
                  label="Imagem"
                  type="text"
                  fullWidth
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  disabled={formType !== 'url'}
                />
                <TextField
                  margin="dense"
                  id="videoLink"
                  label="Vídeo (URL)"
                  type="text"
                  fullWidth
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  disabled={formType !== 'url'}
                />
                <TextField
                  margin="dense"
                  id="description"
                  label="Descrição"
                  type="text"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={formType !== 'url'}
                />
                <Select
                labelId="category-label"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={formType !== 'url'} 
              >
                <MenuItem value="frontend">Frontend</MenuItem>
                <MenuItem value="Wr">Wild Rift</MenuItem>
              </Select>
                <div className="form-actions">
                  <Button onClick={handleClear} color="primary" disabled={formType !== 'url'}>
                    Limpar
                  </Button>
                  <Button type="submit" color="primary" disabled={formType !== 'url'}>
                    Criar
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12}>
            <Paper elevation={5} className={formType === 'upload' ? '' : 'disabled-form'}>
            {/* Área de Dropzone */}
              {/*
              <StyledDropzone  {...getRootProps()} ref={dropzoneRef} className={`dropzone ${getRootProps().isDragActive ? 'dropzone-active' : ''}`}> 
                <input {...getInputProps()} />
                <Typography variant="body2" style={{ textAlign: 'center' }}>
                  Selecione um vídeo para upload
                </Typography>
              </StyledDropzone>*/}
              <TextField
                margin="dense"
                id="title"
                label="Título"
                type="text"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={formType !== 'upload'} 
              />
              <TextField
                margin="dense"
                id="description"
                label="Descrição"
                type="text"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={formType !== 'upload'}
              />
              <Select
                labelId="category-label"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={formType !== 'upload'} 
              >
                <MenuItem value="frontend">Frontend</MenuItem>
                <MenuItem value="Wr">Wild Rift</MenuItem>
              </Select>
              <div className="form-actions">
                <Button onClick={handleClear} color="primary" disabled={formType !== 'upload'}>
                  Limpar
                </Button>
                <Button type="submit" color="primary" disabled={formType !== 'upload'} onClick={handleSubmit}>
                  Criar
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>

      </Container>
      <Footer />
    </div>
  );
};

export default NewVideoPage;