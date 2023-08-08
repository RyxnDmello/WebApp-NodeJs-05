const carousel = document.querySelector(".combos-carousel");
const slides = document.querySelectorAll(".combos-slide");

const buttons = document.querySelectorAll(".combos-carousel-button");
const indicators = document.querySelectorAll(".combos-carousel-indicator");

const width = carousel.clientWidth - 16;
let currentSlide = 0;

export default function CombosCarousel() {
  ButtonsController();
  indicatorsController();
}

function ButtonsController() {
  buttons.forEach((button, buttonIndex) => {
    button.addEventListener("click", () => {
      if (buttonIndex === 1 && currentSlide === slides.length - 1) return;
      if (buttonIndex === 0 && currentSlide === 0) return;

      if (buttonIndex === 1) ++currentSlide;
      if (buttonIndex === 0) --currentSlide;

      CarouselMoveSlides(buttonIndex);
      IndicatorsAnimation();
    });
  });
}

function indicatorsController() {
  indicators.forEach((indicator, indicatorIndex) => {
    indicator.addEventListener("click", () => {
      if (currentSlide === indicatorIndex) return;

      let previousIndex = currentSlide;
      currentSlide = indicatorIndex;

      CarouselMoveSlides(previousIndex > currentSlide ? 0 : 1);
      IndicatorsAnimation();
    });
  });
}

function CarouselMoveSlides(direction) {
  CarouselAnimation(0, direction);

  setTimeout(() => {
    slides.forEach((slide) => {
      slide.style.transform = `translateX(${-currentSlide * width}px)`;
    });
  }, 600);

  CarouselAnimation(605, direction);
}

function CarouselAnimation(duration, direction) {
  if (direction === 0) {
    setTimeout(() => {
      slides.forEach((slide) => {
        if (slide.classList.contains("combos-carousel-fade-out-down")) {
          slide.classList.remove("combos-carousel-fade-out-down");
          slide.classList.remove("combos-carousel-fade-out-up");
          slide.classList.remove("combos-carousel-fade-in-up");
          slide.classList.add("combos-carousel-fade-in-down");
        } else {
          slide.classList.remove("combos-carousel-fade-in-down");
          slide.classList.remove("combos-carousel-fade-in-up");
          slide.classList.remove("combos-carousel-fade-out-up");
          slide.classList.add("combos-carousel-fade-out-down");
        }
      });
    }, duration);

    return;
  }

  setTimeout(() => {
    slides.forEach((slide) => {
      if (slide.classList.contains("combos-carousel-fade-out-up")) {
        slide.classList.remove("combos-carousel-fade-out-up");
        slide.classList.remove("combos-carousel-fade-out-down");
        slide.classList.remove("combos-carousel-fade-in-down");
        slide.classList.add("combos-carousel-fade-in-up");
      } else {
        slide.classList.remove("combos-carousel-fade-in-up");
        slide.classList.remove("combos-carousel-fade-in-down");
        slide.classList.remove("combos-carousel-fade-out-down");
        slide.classList.add("combos-carousel-fade-out-up");
      }
    });
  }, duration);
}

function IndicatorsAnimation() {
  indicators.forEach((indicator, indicatorIndex) => {
    if (indicatorIndex === currentSlide) {
      indicator.style.backgroundColor = "#fff";
      indicator.style.opacity = "1";
    } else {
      indicator.style.backgroundColor = "#000";
      indicator.style.opacity = "0.25";
    }
  });
}
