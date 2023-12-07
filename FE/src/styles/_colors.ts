const colorChips = {
  grayscaleWhite: '#FFFFFF',
  grayscale100: '#F5F5F5',
  grayscale300: '#EDEDED',
  grayscale500: '#B0B8C1',
  grayscale700: '#9299A1',
  grayscale900: '#505967',
  grayscaleBlack: '#000000',

  shadow100: 'rgba(0, 0, 0, 0.1)',
  shadow400: 'rgba(0, 0, 0, 0.4)',
  shadow600: 'rgba(0, 0, 0, 0.6)',

  blackOpacity80: 'rgba(90, 90, 90, 0.9)',

  blue50: '#CBDBFA',
  blue100: '#BDD1F9',
  blue200: '#9FBCF6',
  blue300: '#82A8F3',
  blue400: '#6493F1',
  blue500: '#477FEE',
  blue600: '#3C6BC8',
  blue700: '#3056A2',
  blue800: '#25427C',
  blue900: '#1A2E56',

  navy50: '#CBCFE1',
  navy100: '#BDC2D9',
  navy200: '#9FA7C8',
  navy300: '#828BB7',
  navy400: '#6470A6',
  navy500: '#475595',
  navy600: '#3C477D',
  navy700: '#303A65',
  navy800: '#252C4D',
  navy900: '#1A1F36',

  green50: '#D9F4D8',
  green100: '#CEF1CD',
  green200: '#B8EAB6',
  green300: '#A2E4A0',
  green400: '#8CDD89',
  green500: '#76D773',
  green600: '#63B561',
  green700: '#50924E',
  green800: '#3D703C',
  green900: '#2A4D29',

  red50: '#F6CFCA',
  red100: '#F4C1BB',
  red200: '#EFA59C',
  red300: '#EA897E',
  red400: '#E56E5F',
  red500: '#E05241',
  red600: '#BC4537',
  red700: '#98382C',
  red800: '#742B22',
  red900: '#511E17',

  yellow50: '#F9EFCB',
  yellow100: '#F7EABC',
  yellow200: '#F4E19E',
  yellow300: '#F1D881',
  yellow400: '#EDCF63',
  yellow500: '#EAC645',
  yellow600: '#C5A63A',
  yellow700: '#9F872F',
  yellow800: '#7A6724',
  yellow900: '#544719',
} as const;

export const colors = {
  text: {
    default: colorChips.grayscaleBlack, // #000000
    bold: colorChips.grayscaleBlack, // #000000
    weak: colorChips.grayscale900, // #505967
    sub: colorChips.grayscale500, // #B0B8C1
    subStrong: colorChips.grayscale700, // #9299A1
    white: colorChips.grayscaleWhite, // #FFFFFF
  },
  border: {
    default: colorChips.grayscale500, // #B0B8C1
    weak: colorChips.grayscale300, // #EDEDED
    error: colorChips.red500,
  },
  surface: {
    default: colorChips.grayscaleWhite, // #FFFFFF
    inner: colorChips.grayscale100, // #F5F5F5
    weak: colorChips.grayscale300, // #EDEDED
    weakHover: colorChips.grayscale500,
    black100: colorChips.grayscaleBlack, // #000000
    active: colorChips.green50,
    tooltip: colorChips.blackOpacity80,
  },
  point: {
    primary: {
      default: colorChips.blue500, // #477FEE
      hover: colorChips.blue600, //#3C6BC8
    },
    secondary: {
      default: colorChips.navy500, // #475595
      hover: colorChips.navy600, //#3C477D
    },
  },
  status: {
    active: colorChips.green500, // #76D773
    record: colorChips.red500, // #E05241
  },
  shadow: {
    boxShadow: colorChips.shadow100, // rgba(0, 0, 0, 0.1)
    modalShadow: colorChips.shadow600, // rgba(0, 0, 0, 0.6)
    buttonShadow: colorChips.blue700, // #3056A2
  },
  backdrop: {
    default: colorChips.shadow400,
  },
  toast: {
    info: colorChips.blue500,
    success: colorChips.green500,
    warning: colorChips.yellow500,
    error: colorChips.red500,
    default: colorChips.blue500,
  },
};
