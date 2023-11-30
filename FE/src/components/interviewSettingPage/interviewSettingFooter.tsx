import styled from '@emotion/styled';

export const InterviewSettingFooter = styled.div`
  position: sticky;
  bottom: 0;
  backdrop-filter: blur(3px); /* 10px 블러 효과 */
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.72) 100%
  );
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;
