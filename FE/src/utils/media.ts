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
    alert(
      '현재 브라우저에 카메라 및 마이크가 연결되지 않았습니다. 카메라 및 마이크의 접근 권한의 재설정 후 서비스를 이용하실 수 있습니다.'
    );

    return null;
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

export const createMicrophoneVolumeMonitor = (
  stream: MediaStream,
  volumeCallback: React.Dispatch<React.SetStateAction<number>>
) => {
  const audioContext = new AudioContext();
  const sourceNode = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 2048;

  sourceNode.connect(analyser);
  const pcmData = new Float32Array(analyser.fftSize);

  let intervalId: NodeJS.Timer | number;

  const startMonitoring = () => {
    intervalId = setInterval(() => {
      analyser.getFloatTimeDomainData(pcmData);

      let sumSquares = 0;
      for (let i = 0; i < pcmData.length; i++) {
        sumSquares += pcmData[i] * pcmData[i];
      }
      const rms = Math.sqrt(sumSquares / pcmData.length);

      const weight = 7;
      const amplifiedVolume = rms * weight;

      const normalizedVolume = Math.min(Math.round(amplifiedVolume * 100), 100);

      volumeCallback(normalizedVolume);
    }, 150);
  };

  const stopMonitoring = () => {
    if (intervalId) {
      clearInterval(intervalId as number);
    }
    sourceNode.disconnect();
    analyser.disconnect();
    void audioContext.close();
  };

  return { startMonitoring, stopMonitoring };
};
