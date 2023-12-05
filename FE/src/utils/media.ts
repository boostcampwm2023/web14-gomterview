export const closeMedia = (media: MediaStream | null) => {
  if (media) {
    media.getTracks().forEach((track) => track.stop());
  }
};

export const getMedia = async (): Promise<MediaStream | null> => {
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

    return media;
  } catch (error) {
    throw new Error();
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
