import { Workbook } from '../entity/workbook';
import { memberFixture } from '../../member/fixture/member.fixture';

export const workbookFixture = Workbook.of(
  '테스트 문제집',
  '테스트로 만드는 문제집입니다.',
  'BE',
  memberFixture,
);
