import { CreatePreSignedUrlRequest } from '../dto/createPreSignedUrlRequest';
import { CreateVideoRequest } from '../dto/createVideoRequest';
import { Video } from '../entity/video';

export const videoListExample = [
  {
    id: 5,
    thumbnail: 'https://test-thumbnail1.com',
    videoName: 'test1.webm',
    videoLength: '02:42',
    isPublic: false,
    createdAt: 1699983079205,
  },
  {
    id: 4,
    thumbnail: 'https://test-thumbnail2.com',
    videoName: 'test2.webm',
    videoLength: '03:29',
    isPublic: false,
    createdAt: 1699983079201,
  },
  {
    id: 3,
    thumbnail: 'https://test-thumbnail3.com',
    videoName: 'test.mp4',
    videoLength: '05:22',
    isPublic: false,
    createdAt: 1699858790176,
  },
];

export const videoListFixtureForTest = [
  new Video(
    1,
    1,
    '루이뷔통통튀기네',
    'https://test.com',
    'https://thumbnail-test.com',
    '03:29',
    true,
  ),
  new Video(
    1,
    4,
    '루이뷔통통튀기네',
    'https://foo.com',
    'https://bar-test.com',
    '02:12',
    false,
  ),
];

export const videoFixture = new Video(
  1,
  1,
  '루이뷔통통튀기네',
  'https://test.com',
  'https://thumbnail-test.com',
  '03:29',
  true,
);

export const createVideoRequestFixture = new CreateVideoRequest(
  1,
  'foobar.webm',
  'https://foo.com',
  'https://bar.com',
  '03:29',
);

export const createPreSignedUrlRequestFixture = new CreatePreSignedUrlRequest(
  1,
);
