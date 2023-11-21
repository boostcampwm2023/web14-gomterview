// video.entity.ts
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultEntity } from 'src/app.entity';
import { Member } from 'src/member/entity/member';
import { Question } from 'src/question/entity/question';
import { CreateVideoRequest } from '../dto/createVideoRequest';
import { DEFAULT_THUMBNAIL } from 'src/constant/constant';

@Entity({ name: 'Video' })
export class Video extends DefaultEntity {
  @Column()
  memberId: number;

  @Column()
  questionId: number;

  @ManyToOne(() => Member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'memberId' })
  member: Member;

  @ManyToOne(() => Question, { onDelete: 'CASCADE' })
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

  static from(member: Member, createVidoeRequest: CreateVideoRequest): Video {
    return new Video(
      member.id,
      createVidoeRequest.questionId,
      createVidoeRequest.videoName,
      createVidoeRequest.url,
      createVidoeRequest.thumbnail || DEFAULT_THUMBNAIL,
      createVidoeRequest.videoLength,
      false,
    );
  }
}
