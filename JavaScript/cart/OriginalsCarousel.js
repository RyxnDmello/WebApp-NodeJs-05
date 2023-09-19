const container = document.querySelector(".originals-container");
const carousel = document.querySelector(".originals-carousel");
const items = document.querySelectorAll(".originals-item");

const buttons = document.querySelectorAll(".originals-carousel-button");
const indicators = document.querySelectorAll(".originals-carousel-indicator");

let currentSlide = 0;
let isSlideshow = true;

export default function OriginalsCarousel() {
  if (container === null || container === undefined) return;

  Slideshow();
  ButtonsController();
  IndicatorsController();
}

function Slideshow() {
  container.addEventListener("mouseover", () => (isSlideshow = false));
  container.addEventListener("mouseout", () => (isSlideshow = true));

  setInterval(() => {
    if (!isSlideshow) return;

    if (currentSlide === items.length - 1) {
      currentSlide = 0;
      CarouselMoveSlides();
      IndicatorsAnimation();
      return;
    }

    ++currentSlide;
    CarouselMoveSlides();
    IndicatorsAnimation();
  }, 5000);
}

function ButtonsController() {
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (index === 1 && currentSlide === items.length - 1) {
        currentSlide = 0;
        CarouselMoveSlides();
        IndicatorsAnimation();
        return;
      }

      if (index === 0 && currentSlide === 0) {
        currentSlide = items.length - 1;
        CarouselMoveSlides();
        IndicatorsAnimation();
        return;
      }

      if (index === 1) ++currentSlide;
      if (index === 0) --currentSlide;

      CarouselMoveSlides();
      IndicatorsAnimation();
    });
  });
}

function IndicatorsController() {
  indicators.forEach((indicator, indicatorIndex) => {
    indicator.addEventListener("click", () => {
      if (indicatorIndex === currentSlide) return;
      currentSlide = indicatorIndex;

      CarouselMoveSlides();
      IndicatorsAnimation();
    });
  });
}

function CarouselMoveSlides() {
  CarouselAnimation(0, 112.5);

  setTimeout(() => {
    items.forEach((item) => {
      item.style.transform = `translateX(${
        -currentSlide * carousel.clientWidth
      }px)`;
    });
  }, 787.5);

  CarouselAnimation(792.5, 112.5);
}

function CarouselAnimation(duration, delay) {
  setTimeout(() => {
    items.forEach((item) => {
      const children = item.querySelectorAll(
        ".originals-item-image, .originals-item-color, .originals-item-information, .originals-item-controllers, .originals-item-explore-link"
      );

      let delayDuration = 0;

      children.forEach((child) => {
        setTimeout(() => {
          if (child.classList.contains("originals-carousel-fade-out")) {
            child.classList.remove("originals-carousel-fade-out");
            child.classList.add("originals-carousel-fade-in");
          } else {
            child.classList.remove("originals-carousel-fade-in");
            child.classList.add("originals-carousel-fade-out");
          }
        }, delayDuration);

        delayDuration += delay;
      });
    });
  }, duration);
}

function IndicatorsAnimation() {
  indicators.forEach((indicator, indicatorIndex) => {
    if (indicatorIndex === currentSlide) {
      indicator.style.backgroundColor = "#fff";
      indicator.style.opacity = "1";
    } else {
      indicator.style.backgroundColor = "transparent";
      indicator.style.opacity = "0.25";
    }
  });
}
