
const apiUrl = 'https://api-alura-flix-sand.vercel.app'; 

const getVideos = async () => {
  const response = await fetch(`${apiUrl}/videos`);
  return response.json(); 
};

const createVideo = async (newVideo) => {
  const response = await fetch(`${apiUrl}/videos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newVideo) 
  });
  return response.json(); 
};

const updateVideo = async (updatedVideo) => {
  const response = await fetch(`${apiUrl}/videos/${updatedVideo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedVideo)
  });
  return response.json();
};

const deleteVideo = async (id) => {
  const response = await fetch(`${apiUrl}/videos/${id}`, {
    method: 'DELETE'
  });
  return response.json();
};

const getVideo = async (id) => {
  const response = await fetch(`${apiUrl}/videos/${id}`);
  return response.json(); 
};

const getVideoThumbnail = async (videoId) => {
  const apiKey = 'YOUR_YOUTUBE_API_KEY'; // Substitua pela sua chave da API
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.items && data.items.length > 0) {
    return data.items[0].snippet.thumbnails.default.url; 
  } else {
    return null;
  }
};

export { getVideos, createVideo, updateVideo, deleteVideo, getVideo, getVideoThumbnail };