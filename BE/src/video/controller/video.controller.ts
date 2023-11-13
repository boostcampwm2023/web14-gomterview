import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { VideoService } from '../service/video.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Member } from 'src/member/entity/member';
import { CreateVideoRequest } from '../dto/CreateVideoRequest';

@Controller('/api/video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createVideo(
    @Req() req: Request,
    @Body() createVidoeRequest: CreateVideoRequest,
  ) {
    this.videoService.createVideo(req.user as Member, createVidoeRequest);
  }
}
