import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import useMedia from '@hooks/useMedia';
import useInterviewSettings from '@hooks/atoms/useInterviewSettings';

const MediaStreamPage = () => {
  const { resetAllSettings } = useInterviewSettings();
  const { media, stopMedia } = useMedia();

  useEffect(() => {
    return () => {
      if (media) stopMedia();
    };
  }, [media, stopMedia]);

  useEffect(() => {
    return () => {
      resetAllSettings();
    };
  }, [resetAllSettings]);

  return <Outlet />;
};

export default MediaStreamPage;
