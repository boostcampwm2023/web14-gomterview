// video.entity.ts
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultEntity } from 'src/app.entity';
import { Member } from 'src/member/entity/member';
import { Question } from 'src/question/entity/question';
import { CreateVideoRequest } from '../dto/createVideoRequest';
import { DEFAULT_THUMBNAIL } from 'src/constant/constant';

@Entity({ name: 'Video' })
@Index('idx_video_url', ['url'])
// @Index('idx_video_createdAt', ['createdAt']) TODO: 추후 기능 구현 상황에 따라 인덱싱하기
export class Video extends DefaultEntity {
  @Column({ nullable: true })
  memberId: number;

  @Column({ nullable: true })
  questionId: number;

  @ManyToOne(() => Member, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'memberId' })
  member: Member;

  @ManyToOne(() => Question, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  thumbnail: string;

  @Column()
  videoLength: string;

  @Column({ default: false })
  isPublic: boolean;

  constructor(
    memberId: number,
    questionId: number,
    name: string,
    url: string,
    thumbnail: string,
    videoLength: string,
    isPublic: boolean,
  ) {
    super(undefined, new Date());
    this.memberId = memberId;
    this.questionId = questionId;
    this.name = name;
    this.url = url;
    this.thumbnail = thumbnail;
    this.videoLength = videoLength;
    this.isPublic = isPublic;
  }

  static from(member: Member, createVideoRequest: CreateVideoRequest): Video {
    return new Video(
      member.id,
      createVideoRequest.questionId,
      `${member.nickname}_${createVideoRequest.videoName}`,
      createVideoRequest.url,
      createVideoRequest.thumbnail || DEFAULT_THUMBNAIL,
      createVideoRequest.videoLength,
      false,
    );
  }
}
