import { Avatar, Box, Input, InputArea, Typography } from '@foundation/index';
import { css } from '@emotion/react';
import React from 'react';
import LabelBox from '@components/InterviewSetEditPage/LabelBox';
import InterviewSetCategory from '@components/InterviewSetEditPage/InterviewSetCategory';

const InterviewSetForm: React.FC = () => {
  const avatarImage = 'https://avatars.githubusercontent.com/u/66554167?v=4';
  const userName = 'milk717';
  return (
    <Box
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        padding: 1rem;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          column-gap: 0.5rem;
        `}
      >
        <Avatar width="1.5rem" height="1.5rem" src={avatarImage} />
        <Typography variant="body3">{userName}</Typography>
      </div>
      <LabelBox labelName="제목">
        <Input />
      </LabelBox>
      <LabelBox labelName="카테고리">
        <InterviewSetCategory />
      </LabelBox>
      <LabelBox labelName="설명">
        <InputArea />
      </LabelBox>
    </Box>
  );
};

export default InterviewSetForm;
