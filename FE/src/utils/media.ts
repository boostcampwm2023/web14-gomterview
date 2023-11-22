export const closeMedia = (media: MediaStream | null) => {
  if (media) {
    media.getTracks().forEach((track) => track.stop());
  }
};

type MediaConnectionResult = {
  media: MediaStream | null;
  isConnected: boolean;
};

export const getMedia = async (): Promise<MediaConnectionResult> => {
  try {
    const media = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: { exact: true },
      },
      video: {
        width: 1280,
        height: 720,
      },
    });

    return {
      media: media,
      isConnected: true,
    };
  } catch (error) {
    alert(
      '현재 브라우저에 카메라 및 마이크가 연결되지 않았습니다. 카메라 및 마이크의 접근 권한의 재설정 후 서비스를 이용하실 수 있습니다.'
    );

    return {
      media: null,
      isConnected: false,
    };
  }
};

export const getSupportedMimeTypes = () => {
  const types = [
    'video/webm; codecs=vp8',
    'video/webm; codecs=vp9',
    'video/webm; codecs=h264',
    'video/mp4; codecs=h264',
  ];
  return types.filter((type) => MediaRecorder.isTypeSupported(type));
};
