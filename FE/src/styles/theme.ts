import { colors } from './_colors';
import { typography } from './_typography';

export const theme = { colors, typography };
export type ThemeType = typeof theme;

/*
    useTheme를 통해 테마를 불러올 때 타입 자동완성을 위한 코드입니다.
 */
declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
