import { Question } from '@/types/question';
import { atom } from 'recoil';

export const QuestionAnswerSelectionModal = atom<{
  isOpen: boolean;
  workbookId?: number;
  question?: Question;
}>({
  key: 'questionAnswerSelectionModal',
  default: {
    isOpen: false,
  },
});
