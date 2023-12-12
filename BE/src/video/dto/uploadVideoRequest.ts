// import { ApiProperty } from '@nestjs/swagger';
// import { createPropertyOption } from '../../util/swagger.util';
// import { IsNotEmpty, IsNumberString, IsString, Matches } from 'class-validator';

// export class UploadVideoRequest {
//   @ApiProperty(createPropertyOption(1, '문제 ID', Number))
//   @IsNumberString()
//   @IsNotEmpty()
//   questionId: string;

//   @ApiProperty(createPropertyOption('03:29', '비디오 길이', String))
//   @IsString()
//   @IsNotEmpty()
//   @Matches(/^\d{2}:\d{2}$/, {
//     message: `유효하지 않은 비디오 길이 형태입니다. "mm:ss" 형태로 요청해주세요.`,
//   })
//   videoLength: string;

//   constructor(questionId: number, videoLength: string) {
//     this.questionId = String(questionId);
//     this.videoLength = videoLength;
//   }
// }
