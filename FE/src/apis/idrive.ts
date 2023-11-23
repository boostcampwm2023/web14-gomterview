import axios from 'axios';

type IdriveUploadParams = {
  url?: string;
  blob: Blob;
};

export const putVideoToIdrive = async ({
  url,
  blob,
}: IdriveUploadParams): Promise<void> => {
  if (!url) {
    throw new Error('URL is required for uploading the video');
  }

  try {
    await axios.put<null>(url, blob, {
      headers: { 'Content-Type': 'video/webm; codecs=vp8' },
    });
  } catch (error) {
    console.error('Error occurred while uploading video:', error);
    throw error;
  }
  return;
};
