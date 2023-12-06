import fs from 'fs';
import * as ffmpeg from 'fluent-ffmpeg';

export const DIRECTORY_PATH = './uploads';

export const logUploadStart = (name: string) => {
  const start = new Date();
  console.log(
    `Upload Start<${name}> : ${start.getHours()} : ${start.getMinutes()} : ${start.getSeconds()}`,
  );
};

export const logEncodingDone = (name: string) => {
  const start = new Date();
  console.log(
    `Encoded<${name}> : ${start.getHours()} : ${start.getMinutes()} : ${start.getSeconds()}`,
  );
};

export const createDirectoryIfNotExist = async () => {
  if (!fs.existsSync(DIRECTORY_PATH)) {
    fs.mkdir(DIRECTORY_PATH, { recursive: true }, (err) => {
      if (err) {
        console.error('디렉토리 생성 에러:', err);
        return;
      }
    });
  }
};

export const saveVideoIfNotExists = async (file: Express.Multer.File) => {
  fs.writeFile(createVideoPath(file.originalname), file.buffer, (err) => {
    if (err) {
      console.log(err);
      throw new Error('영상 인코딩 실패');
    }
  });
};

export const encodeVideo = async (name: string) => {
  ffmpeg(createVideoPath(name))
    .output(createVideoPath(name.replace('.webm', '.mp4')))
    .on('end', function () {
      logEncodingDone(name);
      fs.rm(createVideoPath(name), () => {});
      console.log('Finished processing');
    })
    .run();
};

const createVideoPath = (name: string) => `${DIRECTORY_PATH}/${name}`;
