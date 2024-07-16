
import { getVideos, createVideo, updateVideo, deleteVideo, getVideoThumbnail } from './ApiService';

const useApiService = () => {
  return {
    getVideos,
    createVideo,
    updateVideo,
    deleteVideo,
    getVideoThumbnail
  };
};

export default useApiService;