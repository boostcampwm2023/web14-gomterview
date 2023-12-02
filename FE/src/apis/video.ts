import getAPIResponseData from '@/utils/getAPIResponseData';
import { API } from '@constants/api';
import {
  VideoAddReqDto,
  VideoItemResDto,
  VideoListResDto,
  VideoPreSignedResDto,
  VideoPublicToggleResDto,
} from '@/types/video';

export const postVideo = async (body: VideoAddReqDto) => {
  return await getAPIResponseData({
    method: 'post',
    url: API.VIDEO,
    data: body,
  });
};

export const postPreSignedUrl = async () => {
  return await getAPIResponseData<VideoPreSignedResDto>({
    method: 'post',
    url: API.VIDEO_PRE_SIGNED,
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

export const patchVideoPublic = async (videoId: number) => {
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
