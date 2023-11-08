import { css } from '@emotion/react';

const SettingProgressBar: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 20%;
        border: 1px solid red;
      `}
    >
      progress
    </div>
  );
};
export default SettingProgressBar;
