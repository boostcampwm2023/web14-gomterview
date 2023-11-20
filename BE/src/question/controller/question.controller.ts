import { Controller } from '@nestjs/common';
import { QuestionService } from '../service/question.service';

@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}
}
