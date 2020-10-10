Array.from(document.querySelectorAll(".Accordion")).forEach((accordion) => {
  // Allow for multiple accordion sections to be expanded at the same time
  const allowMultiple = accordion.hasAttribute("data-allow-multiple");

  // Allow for each toggle to both open and close individually
  const allowToggle = allowMultiple
    ? allowMultiple
    : accordion.hasAttribute("data-allow-toggle");

  // Create the array of toggle elements for the accordion group
  const triggers = Array.from(accordion.querySelectorAll(".Accordion-trigger"));
  const panels = Array.from(accordion.querySelectorAll(".Accordion-panel"));

  accordion.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("Accordion-trigger")) {
      // Check if the current toggle is expanded.
      const isExpanded = target.getAttribute("aria-expanded") == "true";
      const active = accordion.querySelector("[aria-expanded='true']");

      if (!allowMultiple && active && active !== target) {
        // Set the expanded state on the triggering element
        active.setAttribute("aria-expanded", false);

        // Hide the accordion sections, using aria-controls to specify the desired section
        document
          .getElementById(active.getAttribute("aria-controls"))
          .setAttribute("hidden", "");

        // When toggling is not allowed, clean up disabled state
        if (!allowToggle) {
          active.removeAttribute("aria-disabled");
        }
      }

      if (!isExpanded) {
        // Set the expanded state on the triggering element
        target.setAttribute("aria-expanded", "true");

        // Show the accordion sections, using aria-controls to specify the desired section
        document
          .getElementById(target.getAttribute("aria-controls"))
          .removeAttribute("hidden");

        // If toggling is not allowed, set disabled state on trigger
        if (!allowToggle) {
          target.setAttribute("aria-disabled", true);
        }
      } else if (allowToggle && isExpanded) {
        // Set the expanded state on the triggering element
        target.setAttribute("aria-expanded", false);

        // Hide the accordion sections, using aria-controls to specify the desired section
        document
          .getElementById(target.getAttribute("aria-controls"))
          .setAttribute("hidden", "");
      }

      event.preventDefault();
    }
  });

  // Bind keyboard behaviors on the main accordion container
  accordion.addEventListener("keydown", function (event) {
    const target = event.target;
    const ctrlModifier = event.ctrlKey;

    const isExpanded = target.getAttribute("aria-expanded") == "true";

    function focus(direction) {
      const index = triggers.indexOf(target);
      const length = triggers.length;
      const newIndex = (index + length + direction) % length;
      triggers[newIndex].focus();
    }

    switch (event.key) {
      case "Down": // IE/Edge specific value
      case "ArrowDown": {
        event.preventDefault();
        focus(1);
        break;
      }

      case "Up": // IE/Edge specific value
      case "ArrowUp": {
        event.preventDefault();
        focus(-1);
        break;
      }

      case "PageDown": {
        event.preventDefault();
        if (ctrlModifier) focus(1);
        break;
      }

      case "PageUp": {
        event.preventDefault();
        if (ctrlModifier) focus(-1);
        break;
      }

      case "Home": {
        event.preventDefault();
        triggers[0].focus;
        break;
      }

      case "End": {
        event.preventDefault();
        triggers[length - 1].focus;
        break;
      }

      default:
        return; // Quit when this doesn't handle the key event.
    }
  });

  // These are used to style the accordion when has focus
  accordion.addEventListener(
    "focus",
    function (event) {
      if (accordion.classList.contains("focus")) return;

      accordion.classList.add("focus");
    },
    true
  );

  accordion.addEventListener(
    "blur",
    function (event) {
      if (!accordion.classList.contains("focus")) return;
      accordion.classList.remove("focus");
    },
    true
  );

  // Minor setup: will set disabled state, via aria-disabled, to an
  // expanded/ active accordion which is not allowed to be toggled close
  if (!allowToggle) {
    // Get the first expanded/ active accordion
    const expanded = accordion.querySelector("[aria-expanded='true']");

    // If an expanded/ active accordion is found, disable
    if (expanded) {
      expanded.setAttribute("aria-disabled", true);
    }
  }
});
