import * as fs from 'fs';
import * as ffmpeg from 'fluent-ffmpeg';

export const DIRECTORY_PATH = './uploads';

export const logUploadStart = (name: string) => {
  const start = new Date();
  console.log(
    `${name} : Upload Started at ${start.getHours()} : ${start.getMinutes()} : ${start.getSeconds()}`,
  );
};

export const logEncodingDone = (name: string) => {
  const start = new Date();
  console.log(
    `${name} : Finished Encoding at ${start.getHours()} : ${start.getMinutes()} : ${start.getSeconds()}`,
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
      throw new Error('영상 저장 실패');
    }
  });
};

export const encodeToUpload = async (name: string) => {
  ffmpeg(createVideoPath(name))
    .output(createVideoPath(name.replace('.webm', '.mp4')))
    .output(createVideoPath(name.replace('.webm', '.png')))
    .outputOptions('-frames:v 1')
    .on('end', async () => {
      logEncodingDone(name);
      await deleteWebm(name);
    })
    .run();
};

export const deleteWebm = async (name: string) => {
  fs.rm(createVideoPath(name), () => {
    console.log(`${name} : webm DELETED`);
  });
};

const createVideoPath = (name: string) => `${DIRECTORY_PATH}/${name}`;
