import { useRecoilState } from 'recoil';
import {
  connectStatusState,
  mediaState,
  selectedMimeTypeState,
} from '@atoms/media';
import { useCallback, useEffect, useRef } from 'react';
import { closeMedia, getMedia, getSupportedMimeTypes } from '@/utils/media';

const useGlobalMediaStream = () => {
  const [media, setMedia] = useRecoilState(mediaState);
  const [connectStatus, setConnectStatus] = useRecoilState(connectStatusState);
  const [selectedMimeType, setSelectedMimeType] = useRecoilState(
    selectedMimeTypeState
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  const initStream = useCallback(async () => {
    try {
      //init 로직
      const newMedia = await getMedia();
      setMedia(newMedia);
      setConnectStatus('setup');
      return newMedia;
    } catch (e) {
      setConnectStatus('fail');
      return null;
    }
  }, [setConnectStatus, setMedia]);

  const getStream = useCallback(async () => {
    if (media) return media;
    return await initStream();
  }, [initStream, media]);

  const startMedia = useCallback(async () => {
    const mediaStream = await getStream();
    if (videoRef.current) videoRef.current.srcObject = mediaStream;
    setConnectStatus('connect');
  }, [getStream, setConnectStatus]);

  const stopMedia = useCallback(() => {
    if (media) {
      closeMedia(media);
      setConnectStatus('setup');
    }
  }, [media, setConnectStatus]);

  const clearMedia = () => {
    setMedia(null);
    setConnectStatus('initial');
  };

  useEffect(() => {
    const mimeTypes = getSupportedMimeTypes();
    if (mimeTypes.length > 0) setSelectedMimeType(mimeTypes[0]);
  }, [setSelectedMimeType]);

  useEffect(() => {
    const mediaStream = videoRef.current?.srcObject;
    if (mediaStream instanceof MediaStream) {
      const checkStream = () => {
        if (!mediaStream.active) {
          if (media) {
            setConnectStatus('setup');
          } else {
            setConnectStatus('initial');
          }
          mediaStream.removeEventListener('inactive', checkStream);
        }
      };

      mediaStream.addEventListener('inactive', checkStream);
    }
  }, [videoRef, media, setConnectStatus]);

  return {
    media,
    videoRef,
    connectStatus,
    selectedMimeType,
    startMedia,
    stopMedia,
    clearMedia,
  };
};

export default useGlobalMediaStream;
