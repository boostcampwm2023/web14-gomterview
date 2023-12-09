import { closeMedia, getMedia, getSupportedMimeTypes } from '@/utils/media';
import { useState, useEffect, useCallback, useRef } from 'react';
import useModal from './useModal';
import { MediaDisconnectedModal } from '@components/interviewPage/InterviewModal';

const useMedia = () => {
  const [media, setMedia] = useState<MediaStream | null>(null);
  const [selectedMimeType, setSelectedMimeType] = useState('');

  const [connectStatus, setConnectStatus] = useState<
    'connect' | 'fail' | 'pending'
  >('pending');
  const videoRef = useRef<HTMLVideoElement>(null);

  const { openModal, closeModal } = useModal(() => {
    return <MediaDisconnectedModal closeModal={closeModal} />;
  });

  const startMedia = useCallback(async () => {
    try {
      const newMedia = await getMedia();
      setMedia(newMedia);
      setConnectStatus('connect');
      if (videoRef.current) videoRef.current.srcObject = newMedia;
    } catch (e) {
      setConnectStatus('fail');
      openModal();
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

  useEffect(() => {
    const mediaStream = videoRef.current?.srcObject;
    if (mediaStream instanceof MediaStream) {
      const checkStream = () => {
        if (!mediaStream.active) {
          setConnectStatus('fail');

          mediaStream.removeEventListener('inactive', checkStream);
        }
      };

      mediaStream.addEventListener('inactive', checkStream);
    }
  }, [videoRef, media]);

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
