import { WorkbookEntity } from '@/types/workbook';
import { Box, Avatar, Typography, Icon } from '@foundation/index';
import { theme } from '@styles/theme';
import { css } from '@emotion/react';
import { HTMLElementTypes } from '@/types/utils';

export type WorkbookCardProps = Omit<
  WorkbookEntity,
  'categoryId' | 'workbookId' | 'isPublic'
> &
  HTMLElementTypes<HTMLDivElement>;

const WorkbookCard: React.FC<WorkbookCardProps> = ({
  nickname,
  profileImg,
  copyCount,
  title,
  content,
  ...arg
}) => {
  return (
    <Box
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        row-gap: 0.75rem;
        padding: 1.5rem;
        width: 100%;
        height: 100%;
      `}
      {...arg}
    >
      <div
        css={css`
          display: flex;
          width: 100%;
          justify-content: space-between;
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 0.625rem;
          `}
        >
          <Avatar src={profileImg} width="1.5rem" height="1.5rem" />
          <Typography variant="body3">{nickname}</Typography>
        </div>
        <div
          css={css`
            display: flex;
            gap: 0.625rem;
          `}
        >
          <Icon id="share-workbook" width="1.5rem" height="1.5rem" />
          <Typography variant="body3">{copyCount}</Typography>
        </div>
      </div>
      <Typography variant="title3">{title}</Typography>
      <Typography variant="body3" color={`${theme.colors.text.subStrong}`}>
        {content}
      </Typography>
    </Box>
  );
};
export default WorkbookCard;
