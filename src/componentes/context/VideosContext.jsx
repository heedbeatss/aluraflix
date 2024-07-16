

import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 

const VideosContext = createContext();

const VideosProvider = ({ children }) => {
  const [videos, setVideos] = useState([
    {
      id: uuidv4(), // Adicione o ID ao criar o vídeo
      title: 'O que faz uma desenvolvedora Front-End?',
      description: 'Aprenda como construir interfaces web incríveis!',
      image: 'video-frontend.jpg',
      videoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
      category: 'frontend'
    },
    // Adicione mais vídeos aqui...
  ]);
  const updateVideo = (updatedVideo) => {
    const index = videos.findIndex(video => video.id === updatedVideo.id);
    const newVideos = [...videos];
    newVideos[index] = updatedVideo;
    setVideos(newVideos);
  };

  const deleteVideo = (id) => {
    const newVideos = videos.filter(video => video.id !== id);
    console.log(id)
    setVideos(newVideos);
  };

  const addVideo = (newVideo) => {
    setVideos([
      ...videos, {
        id: uuidv4(),
      ...newVideo
      }
    ]);
  };

  return (
    <VideosContext.Provider value={{ videos, updateVideo, deleteVideo, addVideo }}>
      {children}
    </VideosContext.Provider>
  );
};

export { VideosContext, VideosProvider };