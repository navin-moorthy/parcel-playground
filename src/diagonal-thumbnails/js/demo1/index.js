import { Cursor } from "../cursor";
import { preloadFonts, preloadImages } from "../utils";
import Slideshow from "./slideshow";

Promise.all([preloadImages("slide__img"), preloadFonts("ldj8uhs")]).then(() => {
  // Remove loader (loading class)
  document.body.classList.remove("loading");

  // Initialize custom cursor
  const cursor = new Cursor(document.querySelector(".cursor"));
  console.log("%c cursor", "color: #1d5673", cursor);

  // Initialize the slideshow
  const slideshow = new Slideshow(document.querySelector(".slides"));
  console.log("%c slideshow", "color: #00b300", slideshow);

  // mouse cursor hovers
  [...document.querySelectorAll("a")].forEach((link) => {
    link.addEventListener("mouseenter", () => cursor.enter());
    link.addEventListener("mouseleave", () => cursor.leave());
  });
});
