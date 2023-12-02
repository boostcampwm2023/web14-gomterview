import { useState } from 'react';
import { css } from '@emotion/react';
import { Icon } from '@foundation/index';
import useUserInfo from '@hooks/useUserInfo';
import { breakpoints } from '@styles/_breakpoints';
import { theme } from '@styles/theme';
import { RequestLoginModal } from '@components/workbookPage';
import { InterviewSetGeneratorModal } from '@common/index';

const WorkbookPlusButton: React.FC = () => {
  const isLogin = useUserInfo();
  const [
    interviewSetGeneratorModalIsOpen,
    setInterviewSetGeneratorModalIsOpen,
  ] = useState<boolean>(false);

  const [requestLoginModalIsOpen, setRequestLoginModalIsOpen] =
    useState<boolean>(false);

  const handleWorkbookPlusClick = () => {
    if (isLogin) setInterviewSetGeneratorModalIsOpen(true);
    else setRequestLoginModalIsOpen(true);
  };

  return (
    <>
      <div
        css={css`
          position: fixed;
          bottom: 1.875rem;
          right: 31%;
          border-radius: 1.875rem;
          background-color: ${theme.colors.point.primary.default};
          width: 3.125rem;
          height: 3.125rem;
          transition: all 0.3s;
          cursor: pointer;
          :hover {
            background-color: ${theme.colors.point.primary.hover};
            transform: scale(1.1);
          }

          @media (max-width: ${breakpoints.laptopL}) {
            right: 20%;
          }

          @media (max-width: ${breakpoints.laptop}) {
            right: 15%;
          }

          @media (max-width: ${breakpoints.tablet}) {
            right: 10%;
          }

          @media (max-width: ${breakpoints.mobileL}) {
            right: 5%;
          }
        `}
        onClick={handleWorkbookPlusClick}
      >
        <Icon id="white-plus" width="50px" height="50px" />
      </div>
      <InterviewSetGeneratorModal
        isOpen={interviewSetGeneratorModalIsOpen}
        closeModal={() => setInterviewSetGeneratorModalIsOpen(false)}
      />
      <RequestLoginModal
        isOpen={requestLoginModalIsOpen}
        closeModal={() => setRequestLoginModalIsOpen(false)}
      />
    </>
  );
};

export default WorkbookPlusButton;
