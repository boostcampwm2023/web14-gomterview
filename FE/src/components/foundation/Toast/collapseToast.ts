export function collapseToast(
  node: HTMLDivElement,
  done: () => void,
  duration = 500
) {
  const { scrollHeight, style } = node;

  requestAnimationFrame(() => {
    style.minHeight = 'initial';
    style.height = scrollHeight + 'px';
    style.transition = `all ${duration}ms`;

    requestAnimationFrame(() => {
      style.height = '0';
      style.padding = '0';
      style.margin = '0';
      setTimeout(done, duration);
    });
  });
}
