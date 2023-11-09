import { css } from '@emotion/react';
import LandingBear from '@assets/images/landing-bear2.png';

const SideBackground: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        justify-self: end;
        align-self: end;
      `}
    >
      <img
        src={LandingBear}
        alt={'노트북을 하는 곰돌이의 뒷모습'}
        css={css`
          height: 37rem;
        `}
      />
    </div>
  );
};
export default SideBackground;
