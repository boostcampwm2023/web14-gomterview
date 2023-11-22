import { css } from '@emotion/react';
import { theme } from '@styles/theme';

export const ToggleLabelStyle = css`
  position: relative;
  cursor: pointer;
  width: 2.25rem;
  height: 1.25rem;
  background: ${theme.colors.text.subStrong};
  display: block;
  border-radius: 1rem; // 세로 길이와 동일하게 설정하여 완전한 원형을 만듬
  &:after {
    content: '';
    position: absolute;
    top: 0.1875rem;
    left: 0.1875rem;
    width: 0.875rem;
    height: 0.875rem;
    background: #fff;
    border-radius: 50%;
    transition: 0.3s;
  }
  &:active:after {
    width: 1.25rem;
  }
`;

export const ToggleInputStyle = css`
  &[type='checkbox'] {
    height: 0;
    width: 0;
    visibility: hidden;
  }
  &:checked + label {
    background: ${theme.colors.point.primary.default};
  }
  &:checked + label:after {
    left: calc(100% - 0.1rem);
    transform: translateX(-100%);
  }
`;
