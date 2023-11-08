import { ApiProperty } from '@nestjs/swagger';
import {Question} from "../entity/question";

export class SingleQuestionResponse {
    @ApiProperty({
        example: '1',
        description: '게시물 ID',
    })
    readonly id: number;

    @ApiProperty({
        example: 'CS/BE/FE/CUSTOM',
        description: '질문에 대한 카테고리',
    })
    readonly category: string;

    @ApiProperty({
        example: 'CS는 무슨 단어의 약자일까요?',
        description: '질문 내용',
    })
    readonly content: string;

    constructor(id:number, category:string, content: string) {
        this.id = id;
        this.category = category;
        this.content = content;
    }

    static from(question:Question): SingleQuestionResponse {
        return new SingleQuestionResponse(question.id, question.category, question.content);
    }
}