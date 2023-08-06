const section = document.getElementById("originals");
const carousel = document.querySelector(".originals-carousel");
const slides = document.querySelectorAll(".originals-slide");

const buttons = document.querySelectorAll(".originals-carousel-button");
const indicators = document.querySelectorAll(".originals-carousel-indicator");

const width = carousel.clientWidth - 64;
let isSlideshowActive = true;
let currentSlide = 0;

export default function OriginalsCarousel() {
  ButtonsController();
  IndicatorsController();
  CarouselSlideshow();
}

function ButtonsController() {
  buttons.forEach((button, currentButton) => {
    button.addEventListener("click", () => {
      if (currentButton === 1 && currentSlide === slides.length - 1) return;
      if (currentButton === 0 && currentSlide === 0) return;

      if (currentButton === 1) ++currentSlide;
      if (currentButton === 0) --currentSlide;

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

function CarouselSlideshow() {
  section.addEventListener("mouseover", () => (isSlideshowActive = false));
  section.addEventListener("mouseout", () => (isSlideshowActive = true));

  setInterval(() => {
    if (!isSlideshowActive) return;

    if (currentSlide === slides.length - 1) currentSlide = 0;
    else ++currentSlide;

    CarouselMoveSlides();
    IndicatorsAnimation();
  }, 5000);
}

function CarouselMoveSlides() {
  CarouselAnimation(0, 150);

  setTimeout(() => {
    slides.forEach((slide) => {
      slide.style.transform = `translateX(${-currentSlide * width}px)`;
    });
  }, 850);

  CarouselAnimation(855, 150);
}

function CarouselAnimation(duration, delay) {
  setTimeout(() => {
    slides.forEach((slide) => {
      const objects = slide.querySelectorAll(
        ".originals-slide-image, .originals-slide-title, .originals-slide-details, .originals-slide-buttons"
      );

      let delayDuration = 0;

      objects.forEach((object) => {
        setTimeout(() => {
          if (object.classList.contains("originals-slide-fade-out")) {
            object.classList.remove("originals-slide-fade-out");
            object.classList.add("originals-slide-fade-in");
          } else {
            object.classList.remove("originals-slide-fade-in");
            object.classList.add("originals-slide-fade-out");
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
