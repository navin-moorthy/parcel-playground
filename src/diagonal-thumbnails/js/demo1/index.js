import { Cursor } from "../cursor";
import { preloadFonts } from "../utils";

Promise.all([preloadFonts("ldj8uhs")]).then(() => {
  // Remove loader (loading class)
  document.body.classList.remove("loading");

  const cursor = new Cursor(document.querySelector(".cursor"));
  console.log("%c cursor", "color: #00bf00", cursor);
});
