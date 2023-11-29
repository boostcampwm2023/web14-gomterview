// React 및 필요한 라이브러리와 컴포넌트를 가져옵니다.
import React, { useEffect, useState } from 'react';
import { Box } from '@foundation/index';
import { css } from '@emotion/react';
import { HTMLElementTypes } from '@/types/utils';

// CategoryMenuType는 HTMLDivElement에 대한 타입을 확장합니다.
type CategoryMenuType = HTMLElementTypes<HTMLDivElement>;

// CategoryMenu 함수형 컴포넌트를 정의합니다. 이 컴포넌트는 children과 다른 props를 받을 수 있습니다.
const CategoryMenu: React.FC<CategoryMenuType> = ({ children, ...arg }) => {
  // translateY 상태를 사용하여 메뉴의 Y축 위치를 관리합니다.
  const [translateY, setTranslateY] = useState(100);
  const throttleDuration = 100; // 스로틀링에 사용할 시간을 밀리초 단위로 설정합니다 (100ms)

  useEffect(() => {
    let lastKnownScrollPosition = 0;
    let ticking = false;
    let throttleTimeout: NodeJS.Timeout | null = null;

    // 스크롤 이벤트를 처리하는 함수입니다.
    const handleScroll = () => {
      lastKnownScrollPosition = 100 + window.scrollY;

      // 스로틀링 로직을 구현합니다.
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              setTranslateY(lastKnownScrollPosition);
              ticking = false;
              throttleTimeout = null;
            });

            ticking = true;
          }
        }, throttleDuration);
      }
    };

    // 스크롤 이벤트 리스너를 추가합니다.
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
    };
  }, []);

  // Box 컴포넌트를 반환합니다. 이 컴포넌트는 스타일링과 children을 포함합니다.
  return (
    <Box
      css={css`
        position: absolute;
        will-change: transform;
        transform: translateY(${translateY}px);
        left: -120px;
        transition: transform 0.3s linear;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        row-gap: 0.75rem;
        padding: 1.5rem;
        border: 1px solid blue;
        width: auto;
        height: auto;
      `}
      {...arg}
    >
      {children}
    </Box>
  );
};

// CategoryMenu 컴포넌트를 export합니다.
export default CategoryMenu;
