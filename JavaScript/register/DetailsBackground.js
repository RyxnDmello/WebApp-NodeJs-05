const backgrounds = document.querySelectorAll(".register-details-background");
const buttons = document.querySelectorAll(".details-controller-button");

let currentBackground = 0;

export default function DetailsBackground() {
  BackgroundController();
}

function BackgroundController() {
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (index === 1 && currentBackground === backgrounds.length - 1) return;
      if (index === 0 && currentBackground === 0) return;

      if (index === 0) --currentBackground;
      if (index === 1) ++currentBackground;

      backgrounds.forEach((background, backgroundIndex) => {
        if (backgroundIndex === currentBackground) {
          background.style.opacity = "1";
        } else {
          background.style.opacity = "0";
        }
      });
    });
  });
}
