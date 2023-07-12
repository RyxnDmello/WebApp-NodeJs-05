const carousel = document.querySelector(".header-carousel");
const slides = document.querySelectorAll(".header-carousel-slide");
const buttons = document.querySelectorAll(".header-carousel-button");
const indicators = document.querySelectorAll(".header-carousel-indicator");

const carouselWidth = carousel.clientWidth - 32;
let currentSlide = 0;

export default function ProductCarousel() {
  buttons.forEach((button) => {
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
  slides.forEach((slide) => {
    slide.style.translate = `${-currentSlide * carouselWidth}px 0`;
  });
}

function CarouselController(button) {
  if (button.classList.contains("right")) ++currentSlide;
  else --currentSlide;

  if (currentSlide > 2) currentSlide = 2;
  if (currentSlide < 0) currentSlide = 0;
}

function IndicatorAnimation(selectedIndex) {
  indicators.forEach((indicator, index) => {
    if (index === selectedIndex) indicator.style.opacity = 1;
    else indicator.style.opacity = 0.25;
  });
}
