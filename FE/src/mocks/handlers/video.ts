import { API } from '@/constants/api';
import { http, HttpResponse } from 'msw';

const videoHandlers = [
  http.post(API.VIDEO, ({ request }) => {
    return HttpResponse.json({}, { status: 201 });
  }),
  http.post(API.VIDEO_PRE_SIGNED, ({ request }) => {
    return HttpResponse.json({}, { status: 201 });
  }),
  http.get(API.VIDEO_ALL, () => {
    return HttpResponse.json(
      [
        {
          id: 1,
          questionId: 1,
          name: 'CSS 선택자의 종류에 대해 설명해주세요.',
          url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          thumbnail:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
          videoLength: '00:10:53',
          isPublic: false,
          createdAt: '2023-11-12 08:22:12',
        },
        {
          id: 2,
          questionId: 1,
          name: 'Big Buck Bunny',
          url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          thumbnail:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
          videoLength: '',
          isPublic: true,
          createdAt: '2001-07-17 08:22:12',
        },
        {
          id: 3,
          questionId: 1,
          name: 'Elephant Dream',
          url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          thumbnail:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
          videoLength: '',
          isPublic: false,
          createdAt: '2023-11-11 08:22:12',
        },
      ],
      { status: 200 }
    );
  }),
  http.get(API.VIDEO_ID(), () => {
    return HttpResponse.json(
      [
        {
          id: 1,
          questionId: 1,
          name: 'CSS 선택자의 종류에 대해 설명해주세요.',
          url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          createdAt: '2023-11-12 08:22:12',
        },
      ],
      { status: 200 }
    );
  }),
  http.get(API.VIDEO_HASH(), () => {
    return HttpResponse.json(
      { hash: 'hashstringstringsrting' },
      { status: 200 }
    );
  }),
  http.patch(API.VIDEO_ID(), () => {
    return HttpResponse.json(null, { status: 204 });
  }),
  http.delete(API.VIDEO_ID(), ({ request }) => {
    return HttpResponse.json(null, { status: 204 });
  }),
];

export default videoHandlers;
