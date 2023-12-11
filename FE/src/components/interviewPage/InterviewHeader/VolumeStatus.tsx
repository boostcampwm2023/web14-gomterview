import { createMicrophoneVolumeMonitor } from '@/utils/media';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import useMedia from '@hooks/useMedia';

const VolumeStatus: React.FC = () => {
  const { media } = useMedia();
  const [audioVolume, setAudioVolume] = useState<number>(0);

  useEffect(() => {
    if (!media) {
      return;
    }

    const { startMonitoring, stopMonitoring } = createMicrophoneVolumeMonitor(
      media,
      setAudioVolume
    );

    startMonitoring();

    return () => {
      stopMonitoring();
    };
  }, [media]);

  const getVolumeDivColor = () => {
    const green = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, '0');

    return `#00${green}FF`;
  };

  const colors = Array.from({ length: 6 }, getVolumeDivColor);

  const getRandomHeight = () => {
    return Math.max(10, audioVolume * (0.5 + Math.random() / 2));
  };

  return (
    <div
      css={css`
        display: flex;
        align-items: end;
        justify-content: space-between;
        width: 30px;
        height: 30px;
      `}
    >
      {colors.map((color, index) => (
        <div
          key={index}
          css={css`
            width: 4px;
            background-color: ${color};
            height: ${getRandomHeight()}%;
            transition:
              height 0.3s ease,
              background-color 0.3s ease;
          `}
        />
      ))}
    </div>
  );
};
export default VolumeStatus;
