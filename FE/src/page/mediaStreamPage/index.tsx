import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import useMedia from '@hooks/useMedia';

const MediaStreamPage = () => {
  const { media, stopMedia } = useMedia();

  useEffect(() => {
    return () => {
      if (media) stopMedia();
    };
  }, [media, stopMedia]);

  return <Outlet />;
};

export default MediaStreamPage;
