const backgrounds = document.querySelectorAll(".register-details-background");
const buttons = document.querySelectorAll(".details-controller-button");
const indicators = document.querySelectorAll(".details-controller-indicator");

let currentBackground = 0;

export default function DetailsBackground() {
  BackgroundController();
  IndicatorsController();
  BackgroundSlideshow();
}

function BackgroundController() {
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (index === 1 && currentBackground === backgrounds.length - 1) return;
      if (index === 0 && currentBackground === 0) return;

      if (index === 0) --currentBackground;
      if (index === 1) ++currentBackground;

      SwitchBackgrounds();
      IndicatorAnimations();
    });
  });
}

function IndicatorsController() {
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      if (currentBackground === index) return;
      currentBackground = index;

      SwitchBackgrounds();
      IndicatorAnimations();
    });
  });
}

function BackgroundSlideshow() {
  setInterval(() => {
    if (currentBackground === backgrounds.length - 1) currentBackground = 0;
    else ++currentBackground;

    SwitchBackgrounds();
    IndicatorAnimations();
  }, 5000);
}

function IndicatorAnimations() {
  indicators.forEach((indicator, indicatorIndex) => {
    if (indicatorIndex === currentBackground) {
      indicator.style.opacity = "1";
    } else {
      indicator.style.opacity = "0.25";
    }
  });
}

function SwitchBackgrounds() {
  backgrounds.forEach((background, backgroundIndex) => {
    if (backgroundIndex === currentBackground) {
      background.style.opacity = "1";
    } else {
      background.style.opacity = "0";
    }
  });
}
