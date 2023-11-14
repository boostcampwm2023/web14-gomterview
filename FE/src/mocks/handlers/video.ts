import { API } from '@/constants/api';
import { http, HttpResponse } from 'msw';

const videoHandlers = [
  http.post(API.VIDEO, ({ request }) => {
    return HttpResponse.json({}, { status: 201 });
  }),
  http.post(API.VIDEO_PRE_SIGNED, ({ request }) => {
    return HttpResponse.json(
      {
        preSignedUrl:
          'https://videos.k4i7.la.idrivee2-20.com/%EB%A3%A8%EC%9D%B4%EB%B7%94%ED%86%B5%ED%86%B5%ED%8A%80%EA%B8%B0%EB%84%A4_%EC%82%AD%EC%A0%9C%EB%90%9C%20%EC%A7%88%EB%AC%B8_754ad469-a5e7-48a2-b6bd-61430219c831.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=9li5IlcqRaLakjxoO16x%2F20231114%2Fe2%2Fs3%2Faws4_request&X-Amz-Date=20231114T060953Z&X-Amz-Expires=100&X-Amz-Signature=48691d27634299f2ad74ae7812b49e2bd88a0f8ab677b6b19ba0fc3921b08d24&X-Amz-SignedHeaders=host',
        key: 'Idrive에 등록될 파일 이름입니다.',
      },
      { status: 201 }
    );
  }),
  http.get(API.VIDEO_ALL, () => {
    return HttpResponse.json(
      [
        {
          id: 1,
          videoName: 'CSS 선택자의 종류에 대해 설명해주세요.',
          thumbnail:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
          videoLength: '10:53',
          isPublic: false,
          createdAt: '1699941626145',
        },
        {
          id: 2,
          videoName: 'Big Buck Bunny',
          thumbnail:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
          videoLength: '07:17',
          isPublic: true,
          createdAt: '1699941626145',
        },
        {
          id: 3,
          videoName: 'Elephant Dream',
          thumbnail:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
          videoLength: '03:00',
          isPublic: false,
          createdAt: '1699941626145',
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
          url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          hash: 'asdfasdfasdfsfasdfasf',
          videoName: 'CSS 선택자의 종류에 대해 설명해주세요.',
          createdAt: '1699941626145',
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
