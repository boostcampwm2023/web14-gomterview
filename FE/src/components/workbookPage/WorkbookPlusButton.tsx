import { css } from '@emotion/react';
import { Icon, Tooltip } from '@foundation/index';
import useUserInfo from '@hooks/useUserInfo';
import { breakpoints } from '@styles/_breakpoints';
import { theme } from '@styles/theme';
import { RequestLoginModal } from '@components/workbookPage';
import useModal from '@hooks/useModal';
import { WorkbookGeneratorModal } from '@common/index';

const WorkbookPlusButton: React.FC = () => {
  const isLogin = useUserInfo();
  const { openModal, closeModal } = useModal(() => {
    return <WorkbookGeneratorModal closeModal={closeModal} />;
  });

  const {
    openModal: openRequestLoginModal,
    closeModal: closeRequestLoginModal,
  } = useModal(() => {
    return <RequestLoginModal closeModal={closeRequestLoginModal} />;
  });

  const handleWorkbookPlusClick = () => {
    if (isLogin) openModal();
    else openRequestLoginModal();
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
        <Tooltip title="나만의 면접 세트를 만들어보세요">
          <Icon id="white-plus" width="50px" height="50px" />
        </Tooltip>
      </div>
    </>
  );
};

export default WorkbookPlusButton;
