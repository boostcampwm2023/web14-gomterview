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
        width: 640,
        height: 360,
        frameRate: 30,
      },
    });

    return media;
  } catch (error) {
    throw new Error();
  }
};

export const getSupportedMimeTypes = () => {
  const types = [
    // 'video/webm; codecs=vp8',
    // 'video/webm; codecs=vp9',
    'video/webm; codecs=h264',
    'video/mp4; codecs=h264',
  ];
  return types.filter((type) => MediaRecorder.isTypeSupported(type));
};

// 마이크 입력 스트림의 볼륨을 모니터링하는 함수를 정의합니다.
export const createMicrophoneVolumeMonitor = (
  stream: MediaStream, // 마이크 입력 스트림
  volumeCallback: React.Dispatch<React.SetStateAction<number>> // 볼륨 업데이트 콜백
) => {
  // 오디오 컨텍스트를 생성하고 입력 스트림을 오디오 컨텍스트에 연결합니다.
  const audioContext = new AudioContext();
  const sourceNode = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();

  // FFT 사이즈를 설정합니다. 이 값은 PCM 데이터의 길이를 결정합니다.
  analyser.fftSize = 2048;

  // 소스 노드를 분석기에 연결하고 PCM 데이터를 저장할 배열을 생성합니다.
  sourceNode.connect(analyser);
  const pcmData = new Float32Array(analyser.fftSize);

  let intervalId: NodeJS.Timer | number;

  // 모니터링을 시작하는 함수를 정의합니다.
  const startMonitoring = () => {
    // 주기적으로 볼륨을 체크하기 위한 인터벌을 설정합니다. -> 마이크 입력에 따라 해당 함수가 호출되는것이 아닌, 주기적으로 현재 마이크 상태를 반환하는것
    intervalId = setInterval(() => {
      analyser.getFloatTimeDomainData(pcmData);

      // PCM 데이터를 통해 제곱합을 계산합니다.
      const sumSquares = pcmData.reduce((sum, value) => sum + value * value, 0);
      const rms = Math.sqrt(sumSquares / pcmData.length);

      // 볼륨을 증폭하기 위한 가중치를 설정합니다.
      const weight = 7;
      const amplifiedVolume = rms * weight;

      // 볼륨을 0에서 100 사이로 정규화합니다.
      const normalizedVolume = Math.min(Math.round(amplifiedVolume * 100), 100);

      // 볼륨을 업데이트 하는 setState 함수를 실행시킵니다.
      volumeCallback(normalizedVolume);
    }, 150);
  };

  // 모니터링을 중지하는 함수를 정의합니다.
  const stopMonitoring = () => {
    // 인터벌 타이머가 설정되어 있으면 해제합니다.
    if (intervalId) {
      clearInterval(intervalId as number);
    }
    sourceNode.disconnect();
    analyser.disconnect();
    void audioContext.close();
  };

  return { startMonitoring, stopMonitoring };
};
