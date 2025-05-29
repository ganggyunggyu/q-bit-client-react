export const controller = new AbortController();

export const delay = (
  ms: number,
  controller?: AbortController,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      resolve();
      clearTimeout(timer);
    }, ms);

    if (controller) {
      controller.signal.addEventListener('abort', () => {
        clearTimeout(timer);
        reject(new Error('clear error'));
      });
    }
  });
};
