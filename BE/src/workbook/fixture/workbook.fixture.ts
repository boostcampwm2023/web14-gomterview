import { Workbook } from '../entity/workbook';
import { memberFixture } from '../../member/fixture/member.fixture';
import { categoryFixtureWithId } from '../../category/fixture/category.fixture';
import { CreateWorkbookRequest } from '../dto/createWorkbookRequest';
import { UpdateWorkbookRequest } from '../dto/updateWorkbookRequest';

export const workbookFixture = Workbook.of(
  '테스트 문제집',
  '테스트로 만드는 문제집입니다.',
  categoryFixtureWithId,
  memberFixture,
);

export const workbookFixtureWithId = new Workbook(
  1,
  new Date(),
  '테스트 문제집',
  '테스트로 만드는 문제집입니다.',
  categoryFixtureWithId,
  0,
  memberFixture,
);

export const createWorkbookRequestFixture = new CreateWorkbookRequest(
  workbookFixture.title,
  workbookFixture.content,
  categoryFixtureWithId.id,
);

export const updateWorkbookRequestFixture = new UpdateWorkbookRequest(
  workbookFixtureWithId.id,
  'newT',
  'newC',
  categoryFixtureWithId.id,
);
