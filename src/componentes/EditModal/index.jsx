import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useApiService from '../Api/useApiService'; 
import styled from 'styled-components';

const StyledDialog = styled(Dialog)`
  .MuiDialogContent-root {
    padding: 20px;
  }
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

const EditModal = ({ video, onClose, onUpdateVideo }) => { 
  const { updateVideo } = useApiService();

  const [title, setTitle] = useState(video.title);
  const [category, setCategory] = useState(video.category);
  const [image, setImage] = useState(video.image); 
  const [videoLink, setVideoLink] = useState(video.videoLink);
  const [description, setDescription] = useState(video.description);
  // Remova o estado selectedFile do EditModal
  // const [selectedFile, setSelectedFile] = useState(null); 

  // Remova o useDropzone do EditModal
  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: 'video/*', 
  //   onDrop: acceptedFiles => {
  //     setSelectedFile(acceptedFiles[0]);
  //   },
  // });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Crie um novo objeto com os dados atualizados
    const updatedVideo = {
      id: video.id, 
      title,
      category,
      image,
      videoLink,
      description
    };
    // Chame a função onUpdateVideo para atualizar o estado no HomePage
    await onUpdateVideo(updatedVideo); 
    onClose();
  };

  const handleClear = () => {
    setTitle('');
    setCategory('');
    setImage('');
    setVideoLink('');
    setDescription('');
  };

  return (
    <StyledDialog open={true} onClose={onClose}>
      <DialogTitle>Editar Card</DialogTitle>
      <DialogContent>
        {/* Remova o componente Dropzone do EditModal */}
        {/* <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Arraste e solte um vídeo aqui, ou clique para selecionar</p>
        </div> */}
        <StyledTextField
          autoFocus
          margin="dense"
          id="title"
          label="Título"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <StyledTextField
          margin="dense"
          id="image"
          label="Imagem"
          type="text"
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <StyledTextField
          margin="dense"
          id="videoLink"
          label="Vídeo"
          type="text"
          fullWidth
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
        <StyledTextField
          margin="dense"
          id="description"
          label="Descrição"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Select
          labelId="category-label"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="frontend">Frontend</MenuItem>
          <MenuItem value="backend">Backend</MenuItem>
          <MenuItem value="inovacao">Inovação</MenuItem>
          <MenuItem value="gestao">Gestão</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={handleClear} color="primary">
          Limpar
        </StyledButton>
        <StyledButton onClick={handleSubmit} color="primary">
          Salvar
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default EditModal;