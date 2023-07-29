const carousel = document.querySelector(".header-carousel");
const slides = document.querySelectorAll(".header-carousel-slide");

const buttons = document.querySelectorAll(".header-carousel-button");
const indicators = document.querySelectorAll(".header-carousel-indicator");

const carouselWidth = carousel.clientWidth - 32;
let currentSlide = 0;

export default function HeaderCarousel() {
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      CarouselController(button);
      IndicatorAnimation(currentSlide);
      CarouselMoveSlides();
    });
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index;
      IndicatorAnimation(index);
      CarouselMoveSlides();
    });
  });
}

function CarouselMoveSlides() {
  CarouselAnimation(0, 137.5);

  setTimeout(() => {
    slides.forEach((slide) => {
      slide.style.translate = `${-currentSlide * carouselWidth}px 0`;
    });
  }, 825);

  CarouselAnimation(830, 137.5);
}

function CarouselController(button) {
  if (button.classList.contains("right")) ++currentSlide;
  else --currentSlide;

  if (currentSlide > 2) currentSlide = 2;
  if (currentSlide < 0) currentSlide = 0;
}

function CarouselAnimation(duration, delay) {
  setTimeout(() => {
    slides.forEach((slide) => {
      const objects = slide.querySelectorAll(
        ".header-carousel-slide-title, .header-product"
      );

      let delayDuration = 0;

      objects.forEach((object) => {
        setTimeout(() => {
          if (object.classList.contains("header-product-fade-out")) {
            object.classList.add("header-product-fade-in");
            object.classList.remove("header-product-fade-out");
          } else {
            object.classList.add("header-product-fade-out");
            object.classList.remove("header-product-fade-in");
          }
        }, delayDuration);

        delayDuration += delay;
      });
    });
  }, duration);
}

function IndicatorAnimation(selectedIndex) {
  indicators.forEach((indicator, index) => {
    if (index === selectedIndex) indicator.style.opacity = 1;
    else indicator.style.opacity = 0.25;
  });
}
