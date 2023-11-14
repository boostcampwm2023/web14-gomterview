import { ApiProperty } from '@nestjs/swagger';
import { createPropertyOption } from 'src/util/swagger.util';

export class PreSignedUrlResponse {
  @ApiProperty(
    createPropertyOption(
      'https://example.com',
      '비디오 업로드를 위한 Pre-Signed URL',
      String,
    ),
  )
  readonly preSignedUrl: string;

  @ApiProperty(createPropertyOption('example.webm', '저장할 파일 이름', String))
  readonly key: string;

  constructor(preSignedUrl: string, key: string) {
    this.preSignedUrl = preSignedUrl;
    this.key = key;
  }
}
