import { ApiProperty } from '@nestjs/swagger';
import { createPropertyOption } from 'src/util/swagger.util';

export class VideoHashResponse {
  @ApiProperty(
    createPropertyOption(
      '65f031b26799cc74755bdd3ef4a304eaec197e402582ef4a834edb58e71261a0',
      '비디오의 URL 해시값',
      String,
    ),
  )
  @ApiProperty({ nullable: true })
  readonly hash: string;
  constructor(hash: string) {
    this.hash = hash;
  }
}
