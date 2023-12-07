import { API } from '@constants/api';
import { HttpResponse, http } from 'msw';
import workbookData from '../../data/workbook.json';
import { WorkbookEntity } from '@/types/workbook';

const workbookHandlers = [
  http.post(API.WORKBOOK, ({ request }) => {
    return HttpResponse.json({ workbookId: 1 }, { status: 201 });
  }),
  http.get(API.WORKBOOK, ({ request }) => {
    const category = request.url.split('category=')[1];
    const categoryMap = new Map<number, WorkbookEntity[]>();
    workbookData.forEach((workbook) => {
      categoryMap.has(workbook.categoryId)
        ? categoryMap.get(workbook.categoryId)!.push(workbook)
        : categoryMap.set(workbook.categoryId, [workbook]);
    });
    return HttpResponse.json(
      !category ? workbookData : categoryMap.get(Number(category)),
      {
        status: 200,
      }
    );
  }),
  http.get(API.WORKBOOK_TITLE, () => {
    return HttpResponse.json(
      workbookData.map((workbook) => ({
        workbookId: workbook.workbookId,
        title: workbook.title,
      })),
      { status: 200 }
    );
  }),
  http.get(API.WORKBOOK_ID(), ({ params }) => {
    return HttpResponse.json(
      {
        message: '문제집을 찾을 수 없습니다.',
        errorCode: 'W01',
      },
      { status: 404 }
    );
  }),
  http.patch(API.WORKBOOK_ID(), ({ request }) => {
    return HttpResponse.json(
      {
        message: '문제집을 찾을 수 없습니다.',
        errorCode: 'W01',
      },
      { status: 404 }
    );
  }),
  http.delete(API.WORKBOOK_ID(), () => {
    return HttpResponse.json(
      {
        message: '문제집을 찾을 수 없습니다.',
        errorCode: 'W01',
      },
      { status: 404 }
    );
  }),
];

export default workbookHandlers;
