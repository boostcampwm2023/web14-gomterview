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

  const startMedia = useCallback(async () => {
    try {
      const newMedia = await getMedia();
      setMedia(newMedia);
      if (videoRef.current) videoRef.current.srcObject = newMedia;
      setConnectStatus('connect');
    } catch (e) {
      setConnectStatus('fail');
    }
  }, [setConnectStatus, setMedia]);

  const stopMedia = useCallback(() => {
    if (media) {
      closeMedia(media);
      setMedia(null);
      setConnectStatus('initial');
    }
  }, [media, setConnectStatus, setMedia]);

  useEffect(() => {
    const mimeTypes = getSupportedMimeTypes();
    if (mimeTypes.length > 0) setSelectedMimeType(mimeTypes[0]);
  }, [setSelectedMimeType]);

  useEffect(() => {
    const mediaStream = videoRef.current?.srcObject;
    if (mediaStream instanceof MediaStream) {
      const checkStream = () => {
        if (!mediaStream.active) {
          setConnectStatus('initial');
          mediaStream.removeEventListener('inactive', checkStream);
        }
      };

      mediaStream.addEventListener('inactive', checkStream);
    }
  }, [videoRef, media, setConnectStatus]);

  useEffect(() => {
    console.log(connectStatus);
  }, [connectStatus]);

  return {
    media,
    videoRef,
    connectStatus,
    selectedMimeType,
    startMedia,
    stopMedia,
  };
};

export default useGlobalMediaStream;
