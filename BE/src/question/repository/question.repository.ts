import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Question} from "../entity/question";
import {Repository} from "typeorm";

@Injectable()
export class QuestionRepository {
    constructor(@InjectRepository(Question) private questionRepository:Repository<Question>) {
    }

    async save(question:Question) {
        await this.questionRepository.save(question);
    }

    async findAllByCategoryOrderByCreatedAtDesc(category: string, memberId:number): Promise<Question[]> {
        return (await this.constructQueryBuilder(category, memberId))
            .orderBy("question.createdAt", "DESC")
            .getMany();
    }

    private async constructQueryBuilder(category: string, memberId:number) {
        const queryBuilder = this.questionRepository.createQueryBuilder("question");

        if (category === "CUSTOM") {
            return queryBuilder
                .leftJoin("question.members", "member")
                .where("question.category = :category", { category })
                .andWhere("member.id = :memberId", { memberId });
        }

        return queryBuilder
            .where("question.category = :category", { category });
    }
}