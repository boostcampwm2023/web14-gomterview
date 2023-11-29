import { PATH } from '@constants/path';
import { Params, json, redirect } from 'react-router-dom';

const interviewWorkbookDetailLoader = (params: Params<string>) => {
  const workbookId = params.workbookId;
  if (!workbookId || isNaN(Number(workbookId))) {
    return redirect(PATH.ROOT);
  } else {
    return json({ workbookId: params.workbookId });
  }
};

export default interviewWorkbookDetailLoader;
