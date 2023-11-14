import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { VideoService } from '../service/video.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Member } from 'src/member/entity/member';
import { CreateVideoRequest } from '../dto/CreateVideoRequest';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { createApiResponseOption } from 'src/util/swagger.util';
import { PreSignedUrlResponse } from '../dto/preSignedUrlResponse';
import { CreatePreSignedUrlRequest } from '../dto/createPreSignedUrlRequest';
import { VideoListResponse } from '../dto/videoListResponse';

@Controller('/api/video')
@ApiTags('video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiBody({ type: CreateVideoRequest })
  @ApiOperation({
    summary: '비디오 정보를 DB에 저장',
  })
  @ApiResponse(createApiResponseOption(201, '비디오 정보 저장 완료', null))
  async createVideo(
    @Req() req: Request,
    @Body() createVidoeRequest: CreateVideoRequest,
  ) {
    this.videoService.createVideo(req.user as Member, createVidoeRequest);
  }

  @Post('/pre-signed')
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiBody({ type: CreatePreSignedUrlRequest })
  @ApiOperation({
    summary: 'Pre-Signed URL을 발급',
  })
  @ApiResponse(
    createApiResponseOption(
      201,
      'Pre-Signed URL 발급 완료',
      PreSignedUrlResponse,
    ),
  )
  async getPreSignedUrl(
    @Req() req: Request,
    @Body() createPreSignedUrlRequest: CreatePreSignedUrlRequest,
  ) {
    return await this.videoService.getPreSignedUrl(
      req.user as Member,
      createPreSignedUrlRequest,
    );
  }

  @Get('/all')
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiOperation({
    summary: '자신의 모든 비디오 정보를 반환',
  })
  @ApiResponse(
    createApiResponseOption(200, '모든 비디오 조회 완료', VideoListResponse),
  )
  async getAllVideo(@Req() req: Request) {
    return await this.videoService.getAllVideosByMemberId(req.user as Member);
  }
}
