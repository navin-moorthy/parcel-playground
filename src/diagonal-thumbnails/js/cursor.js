import gsap from "gsap";
import { getMousePosition, lerp } from "./utils";

// Track the mouse position
let mouse = { x: 0, y: 0 };

window.addEventListener("mousemove", (event) => {
  mouse = getMousePosition(event);
});

export class Cursor {
  constructor(element) {
    this.DOM = { element };
    this.DOM.element.style.opacity = 0;

    this.bounds = this.DOM.element.getBoundingClientRect();

    this.renderedStyles = {
      tx: { previous: 0, current: 0, amt: 0.2 },
      ty: { previous: 0, current: 0, amt: 0.2 },
      scale: { previous: 1, current: 1, amt: 0.17 },
      opacity: { previous: 1, current: 1, amt: 0.17 },
    };

    this.onMouseMoveEvent = () => {
      this.renderedStyles.tx.previous = this.renderedStyles.tx.current =
        mouse.x - this.bounds.width / 2;
      this.renderedStyles.ty.previous = this.renderedStyles.ty.current =
        mouse.y - this.bounds.height / 2;

      gsap.to(this.DOM.element, {
        duration: 0.9,
        ease: "Power3.easeOut",
        opacity: 1,
      });

      requestAnimationFrame(() => this.render());

      window.removeEventListener("mousemove", this.onMouseMoveEvent);
    };

    window.addEventListener("mousemove", this.onMouseMoveEvent);
  }

  enter() {
    this.renderedStyles.scale.current = 1.8;
    this.renderedStyles.opacity.current = 0.5;
  }

  leave() {
    this.renderedStyles.scale.current = 1;
    this.renderedStyles.opacity.current = 1;
  }

  render() {
    this.renderedStyles.tx.current = mouse.x - this.bounds.width / 2;
    this.renderedStyles.ty.current = mouse.y - this.bounds.height / 2;

    for (const key in this.renderedStyles) {
      this.renderedStyles[key].previous = lerp(
        this.renderedStyles[key].previous,
        this.renderedStyles[key].current,
        this.renderedStyles[key].amt
      );
    }

    this.DOM.element.style.transform = `translateX(${this.renderedStyles.tx.previous}px) translateY(${this.renderedStyles.ty.previous}px) scale(${this.renderedStyles.scale.previous})`;
    this.DOM.element.style.opacity = this.renderedStyles.opacity.previous;

    requestAnimationFrame(() => this.render());
  }
}
