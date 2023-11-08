import { ApiProperty } from '@nestjs/swagger';
import {Question} from "../entity/question";
import {SingleQuestionResponse} from "./singleQuestionResponse";

export class QuestionListResponse {
    @ApiProperty({
        example: `
        [
            {
                id: 1,
                category: 'CS',
                content: 'CS는 무슨 단어의 약자일까?'
            },
            {
                id:2,
                category: 'FE',
                content: 'html은 과연 프로그래밍 언어인가?'
            },
            {
            
                id:3,
                category: 'BE',
                content: '백엔드의 MVC의 각 알파벳은 무엇을 의미하는가?'
            }
        ]
        `,
        description: '질문 dto의 리스트',
    })
    readonly questionsList: SingleQuestionResponse[];

    constructor(questionDtoList:SingleQuestionResponse[]) {
        this.questionsList = questionDtoList;
    }

    static from(question:Question[]) : QuestionListResponse{
        return new QuestionListResponse(question.map(SingleQuestionResponse.from));
    }
}