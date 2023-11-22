import { closeMedia, getMedia, getSupportedMimeTypes } from '@/utils/media';
import { useState, useEffect, useCallback, useRef } from 'react';

const useMedia = () => {
  const [media, setMedia] = useState<MediaStream | null>(null);
  const [selectedMimeType, setSelectedMimeType] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const connectMedia = useCallback(async () => {
    try {
      const { media, isConnected: mediaIsConnected } = await getMedia();

      setMedia(media);
      setIsConnected(mediaIsConnected);
      if (videoRef.current) videoRef.current.srcObject = media;
    } catch (e) {
      console.log(`현재 마이크와 카메라가 연결되지 않았습니다`);
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    if (!media) {
      void connectMedia();
    }
    const mimeTypes = getSupportedMimeTypes();
    if (mimeTypes.length > 0) setSelectedMimeType(mimeTypes[0]);

    return () => {
      closeMedia(media);
    };
  }, [media, connectMedia]);

  return { media, videoRef, isConnected, selectedMimeType };
};

export default useMedia;
