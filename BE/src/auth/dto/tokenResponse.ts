import { ApiProperty } from '@nestjs/swagger';

class TokenResponse {
  @ApiProperty({
    example: 'Bearer dlwkdgml',
    description: 'accessToken',
  })
  accessToken: string;
}

export { TokenResponse };
