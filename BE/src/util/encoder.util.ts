import * as fs from 'fs';
import * as ffmpeg from 'fluent-ffmpeg';
import { HttpBadRequestException } from './exception.util';

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

export const saveVideoIfNotExists = (file: Express.Multer.File) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(createVideoPath(file.originalname), file.buffer, (err) => {
      if (err) reject(err);
      resolve(true);
    });
  });
};

export const encodeToUpload = (name: string) => {
  return new Promise((resolve, reject) => {
    ffmpeg(createVideoPath(name))
      .output(createVideoPath(name.replace('.webm', '.mp4')))
      .output(createVideoPath(name.replace('.webm', '.png')))
      .outputOptions('-frames:v 1')
      .on('end', async () => {
        logEncodingDone(name);
        await deleteFile(name);
        resolve(null);
      })
      .on('error', reject)
      .run();
  });
};

export const deleteFile = async (name: string) => {
  fs.rm(createVideoPath(name), () => {
    console.log(`${name} : FILE DELETED`);
  });
};

export const UPLOAD_UTIL = {
  fileFilter: (req, file, callback) => {
    const allowedPattern = /^[\w\d-]+\.(mp4|webm)$/; // 허용할 파일 이름 패턴 (예: 영문자, 숫자, 대시(-)로 이루어진 파일 이름, mp4 또는 webm 확장자)
    if (!allowedPattern.test(file.originalname)) {
      return callback(
        new HttpBadRequestException('Invalid file name', 'V00'),
        false,
      );
    }
    callback(null, true);
  },
};

export const readFileAsBuffer = (name: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(createVideoPath(name), (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};

const createVideoPath = (name: string) => `${DIRECTORY_PATH}/${name}`;
