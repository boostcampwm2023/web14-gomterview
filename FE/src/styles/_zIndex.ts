/**
 * 아래 배열에서 위쪽에 위치한 요소일수록 화면 최상단에 배치되어야 합니다.
 *
 * ex) modal, toast, header가 동시에 겹칠 경우 모달이 가장 상단에 떠야 합니다.
 */
export const zIndex = {
  modal: {
    content: 10000,
    backdrop: 9999,
  },
  toast: {
    content: 999,
  },
  menu: {
    content: 100,
    backdrop: 99,
  },
  tooltip: {
    content: 50,
  },
  /**
   * 헤더 메뉴 오픈시 backdrop 메뉴를 사용하고 있음
   */
  header: {
    content: 10,
  },
  /**
   * 겹치는 요소의 오버레이에 사용됩니다.
   * 오버레이 요소간에도 겹치는 부분이 있어 1 ~ 5까지 범위로 설정했습니다.
   *
   * ex) 비디오 태그 위에 녹화중 컴포넌트, 인터뷰 페이지의 질문창
   */
  contentOverlay: {
    overlay5: 5,
    overlay4: 4,
    overlay3: 3,
    overlay2: 2,
    overlay1: 1,
  },
  bottom: {
    default: -1,
  },
};
