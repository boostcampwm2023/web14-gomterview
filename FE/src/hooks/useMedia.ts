import { closeMedia, getMedia, getSupportedMimeTypes } from '@/utils/media';
import { useState, useEffect, useCallback, useRef } from 'react';

const useMedia = (trigger: boolean = true) => {
  const [media, setMedia] = useState<MediaStream | null>(null);
  const [selectedMimeType, setSelectedMimeType] = useState('');
  const [connectStatus, setIsConnectedStatus] = useState<
    'connect' | 'fail' | 'pending'
  >('pending');
  const videoRef = useRef<HTMLVideoElement>(null);

  const connectMedia = useCallback(async () => {
    try {
      const media = await getMedia();

      setMedia(media);
      if (media) setIsConnectedStatus('connect');
      else setIsConnectedStatus('fail');
      if (videoRef.current) videoRef.current.srcObject = media;
    } catch (e) {
      console.log(`현재 마이크와 카메라가 연결되지 않았습니다`);
    }
  }, []);

  useEffect(() => {
    if (!media && trigger) {
      void connectMedia();
    }
    const mimeTypes = getSupportedMimeTypes();
    if (mimeTypes.length > 0) setSelectedMimeType(mimeTypes[0]);

    return () => {
      closeMedia(media);
    };
  }, [media, connectMedia, trigger]);

  return { media, videoRef, connectStatus, selectedMimeType };
};

export default useMedia;
