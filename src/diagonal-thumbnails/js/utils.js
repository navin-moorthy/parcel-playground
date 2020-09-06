// Preload images
export function preloadFonts(id) {
  return new Promise((resolve) => {
    WebFont.load({
      typekit: { id },
      active: resolve,
    });
  });
}

// Gets the mouse position
export const getMousePosition = (event) => {
  let positionX = 0;
  let positionY = 0;

  if (!event) event = window.event;

  if (event.pageX && event.pageY) {
    positionX = event.pageX;
    positionY = event.pageY;
  } else if (event.clientX && event.clientY) {
    positionX =
      event.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    positionY =
      event.clientY +
      document.body.scrollTop +
      document.documentElement.scrollTop;
  }

  return { x: positionX, y: positionY };
};

// Linear interpolation
export const lerp = (a, b, n) => (1 - n) * a + n * b;
