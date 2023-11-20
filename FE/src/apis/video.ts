import getAPIResponseData from '@/utils/getAPIResponseData';
import { API } from '@constants/api';
import {
  VideoAddReqDto,
  VideoItemResDto,
  VideoListResDto,
  VideoPreSignedReqDto,
  VideoPreSignedResDto,
  VideoPublicToggleResDto,
} from '@/types/video';

export const addVideo = async (body: VideoAddReqDto) => {
  return await getAPIResponseData({
    method: 'post',
    url: API.VIDEO,
    data: body,
  });
};

export const getPreSignedUrl = async (body: VideoPreSignedReqDto) => {
  return await getAPIResponseData<VideoPreSignedResDto, VideoPreSignedReqDto>({
    method: 'post',
    url: API.VIDEO_PRE_SIGNED,
    data: body,
  });
};

export const getVideoList = async () => {
  return await getAPIResponseData<VideoListResDto>({
    method: 'get',
    url: API.VIDEO_ALL,
  });
};

export const getVideoByHash = async (hash: string) => {
  return await getAPIResponseData<VideoItemResDto>({
    method: 'get',
    url: API.VIDEO_HASH(hash),
  });
};

export const getVideoById = async (videoId: number) => {
  return await getAPIResponseData<VideoItemResDto>({
    method: 'get',
    url: API.VIDEO_ID(videoId),
  });
};

export const toggleVideoPublic = async (videoId: number) => {
  return await getAPIResponseData<VideoPublicToggleResDto>({
    method: 'patch',
    url: API.VIDEO_ID(videoId),
  });
};

export const deleteVideoById = async (videoId: number) => {
  return await getAPIResponseData({
    method: 'delete',
    url: API.VIDEO_ID(videoId),
  });
};
