import { API } from '@constants/api';
import { HttpResponse, http } from 'msw';

const workbookHandlers = [
  http.post(API.WORKBOOK, ({ request }) => {
    return HttpResponse.json(
      {
        message: '',
        errorCode: 'Server',
      },
      { status: 500 }
    );
  }),
  http.get(API.WORKBOOK, ({ request }) => {
    return HttpResponse.json(
      {
        message: '',
        errorCode: 'Server',
      },
      { status: 500 }
    );
  }),
  http.get(API.WORKBOOK_TITLE, () => {
    return HttpResponse.json(
      {
        message: '',
        errorCode: 'Server',
      },
      { status: 500 }
    );
  }),
  http.get(API.WORKBOOK_ID(), ({ params }) => {
    return HttpResponse.json(
      {
        message: '',
        errorCode: 'Server',
      },
      { status: 500 }
    );
  }),
  http.patch(API.WORKBOOK_ID(), ({ request }) => {
    return HttpResponse.json(
      {
        message: '',
        errorCode: 'Server',
      },
      { status: 500 }
    );
  }),
  http.delete(API.WORKBOOK_ID(), () => {
    return HttpResponse.json(
      {
        message: '',
        errorCode: 'Server',
      },
      { status: 500 }
    );
  }),
];

export default workbookHandlers;
