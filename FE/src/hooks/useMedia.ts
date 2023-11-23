import { closeMedia, getMedia, getSupportedMimeTypes } from '@/utils/media';
import { useState, useEffect, useCallback, useRef } from 'react';

const useMedia = () => {
  const [media, setMedia] = useState<MediaStream | null>(null);
  const [selectedMimeType, setSelectedMimeType] = useState('');
  const [connectStatus, setConnectStatus] = useState<
    'connect' | 'fail' | 'pending'
  >('pending');
  const videoRef = useRef<HTMLVideoElement>(null);

  const startMedia = useCallback(async () => {
    try {
      const newMedia = await getMedia();
      setMedia(newMedia);
      setConnectStatus(newMedia ? 'connect' : 'fail');
      if (videoRef.current) videoRef.current.srcObject = newMedia;
    } catch (e) {
      console.error('현재 마이크와 카메라가 연결되지 않았습니다.');
      setConnectStatus('fail');
    }
  }, []);

  const stopMedia = useCallback(() => {
    if (media) {
      closeMedia(media);
      setMedia(null);
      setConnectStatus('pending');
    }
  }, [media]);

  useEffect(() => {
    const mimeTypes = getSupportedMimeTypes();
    if (mimeTypes.length > 0) setSelectedMimeType(mimeTypes[0]);
  }, []);

  return {
    media,
    videoRef,
    connectStatus,
    selectedMimeType,
    startMedia,
    stopMedia,
  };
};

export default useMedia;
