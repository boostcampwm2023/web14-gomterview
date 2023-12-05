import getAPIResponseData from '@/utils/getAPIResponseData';
import { API } from '@constants/api';
import {
  WorkbookAddReqDto,
  WorkbookAddResDto,
  WorkbookListResDto,
  WorkbookPatchReqDto,
  WorkbookResDto,
  WorkbookTitleListResDto,
} from '@/types/workbook';

export const postWorkbook = async (body: WorkbookAddReqDto) => {
  return await getAPIResponseData<WorkbookAddResDto, WorkbookAddReqDto>({
    method: 'post',
    url: API.WORKBOOK,
    data: body,
  });
};

export const getWorkbookByCategory = async (categoryId: string) => {
  return await getAPIResponseData<WorkbookListResDto>({
    method: 'get',
    url: API.WORKBOOK_CATEGORY_ID(categoryId),
  });
};

export const getWorkbookTitle = async () => {
  return await getAPIResponseData<WorkbookTitleListResDto>({
    method: 'get',
    url: API.WORKBOOK_TITLE,
  });
};

export const getWorkbookById = async (workbookId: number) => {
  return await getAPIResponseData<WorkbookResDto>({
    method: 'get',
    url: API.WORKBOOK_ID(workbookId),
  });
};

export const patchWorkbookById = async (body: WorkbookPatchReqDto) => {
  return await getAPIResponseData<null, WorkbookPatchReqDto>({
    method: 'patch',
    url: API.WORKBOOK,
    data: body,
  });
};

export const deleteWorkbookById = async (workbookId: number) => {
  return await getAPIResponseData({
    method: 'delete',
    url: API.WORKBOOK_ID(workbookId),
  });
};
