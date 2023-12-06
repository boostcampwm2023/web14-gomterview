import { API } from '@constants/api';
import { delay, http, HttpResponse } from 'msw';
import videoData from '../../data/video.json';

const videoHandlers = [
  http.post(API.VIDEO, ({ request }) => {
    return HttpResponse.json({}, { status: 201 });
  }),
  http.post(API.VIDEO_PRE_SIGNED, ({ request }) => {
    return HttpResponse.json(
      {
        message: 'IDrive 제공 API 처리 도중 에러가 발생하였습니다.',
        errorCode: 'V01',
      },
      { status: 500 }
    );
  }),
  http.get(API.VIDEO_ALL, () => {
    return HttpResponse.json(videoData, { status: 200 });
  }),
  http.get(API.VIDEO_ID(), ({ params }) => {
    const { id } = params;

    return HttpResponse.json(
      videoData.find((video) => video.id === Number(id)),
      { status: 200 }
    );
  }),
  http.get(API.VIDEO_HASH(), () => {
    return HttpResponse.json(videoData.at(0), { status: 200 });
  }),
  http.patch(API.VIDEO_ID(), async () => {
    await delay(1000);
    return HttpResponse.json(null, { status: 200 });
  }),
  http.delete(API.VIDEO_ID(), () => {
    return new HttpResponse(null, { status: 204 });
  }),
];

export default videoHandlers;
