import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { VideoService } from '../service/video.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { Member } from 'src/member/entity/member';
import { CreateVideoRequest } from '../dto/createVideoRequest';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { createApiResponseOption } from 'src/util/swagger.util';
import { PreSignedUrlResponse } from '../dto/preSignedUrlResponse';
import { VideoDetailResponse } from '../dto/videoDetailResponse';
import { VideoHashResponse } from '../dto/videoHashResponse';
import { SingleVideoResponse } from '../dto/singleVideoResponse';

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
  @ApiResponse(createApiResponseOption(500, 'SERVER', null))
  async createVideo(
    @Req() req: Request,
    @Body() createVideoRequest: CreateVideoRequest,
  ) {
    await this.videoService.createVideo(req.user as Member, createVideoRequest);
  }

  @Post('/pre-signed')
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
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
  @ApiResponse(createApiResponseOption(500, 'V1, SERVER', null))
  async getPreSignedUrl(@Req() req: Request) {
    return await this.videoService.getPreSignedUrl(req.user as Member);
  }

  @Get('/all')
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiOperation({
    summary: '자신의 모든 비디오 정보를 반환',
  })
  @ApiResponse(
    createApiResponseOption(200, '모든 비디오 조회 완료', [
      SingleVideoResponse,
    ]),
  )
  @ApiResponse(createApiResponseOption(500, 'SERVER', null))
  async getAllVideo(@Req() req: Request) {
    return await this.videoService.getAllVideosByMemberId(req.user as Member);
  }

  @Get('/hash/:hash')
  @ApiOperation({
    summary: '해시값으로 비디오 정보 불러오기',
  })
  @ApiResponse(
    createApiResponseOption(
      200,
      '해시값을 사용하여 비디오 정보 조회 완료',
      VideoDetailResponse,
    ),
  )
  @ApiResponse(createApiResponseOption(403, 'V2', null))
  @ApiResponse(createApiResponseOption(404, 'V4, M1', null))
  @ApiResponse(createApiResponseOption(500, 'V6', null))
  async getVideoDetailByHash(@Param('hash') hash: string) {
    return await this.videoService.getVideoDetailByHash(hash);
  }

  @Get(':videoId')
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiOperation({
    summary: '비디오 상세 정보를 반환',
  })
  @ApiResponse(
    createApiResponseOption(
      200,
      '비디오 상세 정보 조회 완료',
      VideoDetailResponse,
    ),
  )
  @ApiResponse(createApiResponseOption(403, 'V2', null))
  @ApiResponse(createApiResponseOption(404, 'V3', null))
  @ApiResponse(createApiResponseOption(500, 'V8, SERVER', null))
  async getVideoDetail(@Param('videoId') videoId: number, @Req() req: Request) {
    return await this.videoService.getVideoDetail(videoId, req.user as Member);
  }

  @Patch(':videoId')
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiOperation({
    summary: '비디오 공개/비공개 상태를 전환',
  })
  @ApiResponse(
    createApiResponseOption(200, '비디오 상태 전환 완료', VideoHashResponse),
  )
  @ApiResponse(createApiResponseOption(403, 'V2', null))
  @ApiResponse(createApiResponseOption(404, 'V3', null))
  @ApiResponse(createApiResponseOption(500, 'V5, V6, V7, SERVER', null))
  async toggleVideoStatus(
    @Param('videoId') videoId: number,
    @Req() req: Request,
  ) {
    return await this.videoService.toggleVideoStatus(
      videoId,
      req.user as Member,
    );
  }

  @Delete(':videoId')
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiOperation({
    summary: '비디오 삭제',
  })
  @ApiResponse(createApiResponseOption(204, '비디오 삭제 완료', null))
  @ApiResponse(createApiResponseOption(403, 'V2', null))
  @ApiResponse(createApiResponseOption(404, 'V3', null))
  @ApiResponse(createApiResponseOption(500, 'SERVER', null))
  async deleteVideo(
    @Param('videoId') videoId: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.videoService.deleteVideo(videoId, req.user as Member);
    res.status(204).send();
  }
}
