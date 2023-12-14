import { Workbook } from '../entity/workbook';
import {
  memberFixture,
  otherMemberFixture,
} from '../../member/fixture/member.fixture';
import { categoryFixtureWithId } from '../../category/fixture/category.fixture';
import { CreateWorkbookRequest } from '../dto/createWorkbookRequest';
import { UpdateWorkbookRequest } from '../dto/updateWorkbookRequest';

export const workbookFixture = Workbook.of(
  '테스트 문제집',
  '테스트로 만드는 문제집입니다.',
  categoryFixtureWithId,
  memberFixture,
  true,
);

export const otherWorkbookFixture = Workbook.of(
  '테스트 문제집',
  '테스트로 만드는 문제집입니다.',
  categoryFixtureWithId,
  otherMemberFixture,
  true,
);

export const workbookFixtureWithId = new Workbook(
  1,
  new Date(),
  '테스트 문제집',
  '테스트로 만드는 문제집입니다.',
  categoryFixtureWithId,
  0,
  memberFixture,
  true,
);

export const createWorkbookRequestFixture = new CreateWorkbookRequest(
  workbookFixture.title,
  workbookFixture.content,
  categoryFixtureWithId.id,
  true,
);

export const updateWorkbookRequestFixture = new UpdateWorkbookRequest(
  workbookFixtureWithId.id,
  'newT',
  'newC',
  categoryFixtureWithId.id,
  false,
);

export const workbookInsertResult = {
  identifiers: [{ id: workbookFixtureWithId.id }],
};
