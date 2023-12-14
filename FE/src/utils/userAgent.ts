export const isIOSUser = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};

export const isAndroid = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return /android/i.test(userAgent);
};
