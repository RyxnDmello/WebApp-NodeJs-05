const container = document.querySelector(".combos-carousel-container");
const carousel = document.querySelector(".combos-carousel");
const items = document.querySelectorAll(".combos-item");

const buttons = document.querySelectorAll(".combos-carousel-controller");
const indicators = document.querySelectorAll(".combos-carousel-indicator");

let isSlideshow = true;
let currentItem = 0;
let width = 0;

export default function CombosCarousel() {
  if (container === null || container === undefined) return;
  width = carousel.clientWidth - 64;

  Slideshow();
  ButtonsController();
  IndicatorsController();
}

function Slideshow() {
  container.addEventListener("mouseover", () => (isSlideshow = false));
  container.addEventListener("mouseout", () => (isSlideshow = true));

  setInterval(() => {
    if (!isSlideshow) return;

    if (currentItem === items.length - 1) {
      currentItem = 0;
      CarouselMoveSlides();
      IndicatorsAnimation();
      return;
    }

    ++currentItem;
    CarouselMoveSlides();
    IndicatorsAnimation();
  }, 5000);
}

function ButtonsController() {
  buttons.forEach((button, buttonIndex) => {
    button.addEventListener("click", () => {
      if (buttonIndex === 1 && currentItem === items.length - 1) {
        currentItem = 0;
        CarouselMoveSlides();
        IndicatorsAnimation();
        return;
      }

      if (buttonIndex === 0 && currentItem === 0) {
        currentItem = items.length - 1;
        CarouselMoveSlides();
        IndicatorsAnimation();
        return;
      }

      if (buttonIndex === 1) ++currentItem;
      if (buttonIndex === 0) --currentItem;

      CarouselMoveSlides();
      IndicatorsAnimation();
    });
  });
}

function IndicatorsController() {
  indicators.forEach((indicator, indicatorIndex) => {
    indicator.addEventListener("click", () => {
      if (currentItem === indicatorIndex) return;
      currentItem = indicatorIndex;

      CarouselMoveSlides();
      IndicatorsAnimation();
    });
  });
}

function CarouselMoveSlides() {
  items.forEach((item) => {
    item.style.translate = `${-currentItem * width}px 0`;
  });
}

function IndicatorsAnimation() {
  indicators.forEach((indicator, indicatorIndex) => {
    if (currentItem === indicatorIndex) {
      indicator.style.backgroundColor = "#fff";
      indicator.style.opacity = "1";
    } else {
      indicator.style.backgroundColor = "transparent";
      indicator.style.opacity = "0.5";
    }
  });
}
