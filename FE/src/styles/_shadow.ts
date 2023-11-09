export const shadow = {
  /**
   * 큰 박스에 사용되는 그림자 입니다.
   * ex) 마이페이지 프로필, 마이페이지 탭, 문제 선택기 박스
   */
  boxShadow: `8px 8px 25px 0px rgba(0, 0, 0, 0.10)`,

  /**
   * 작은 박스에 사용되는 그림자입니다.
   * ex) 문제 선택기 박스 안에 있는 아이템
   */
  boxSmallShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.10)`,

  /**
   * 랜딩 페이지의 시작 버튼에 사용되는 그림자입니다.
   */
  buttonLargeShadow: (y: number) => `0px ${y}px 0px 0px #3056A2;`,
};
