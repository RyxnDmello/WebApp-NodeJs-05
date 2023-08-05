const carousel = document.querySelector(".originals-carousel");
const slides = document.querySelectorAll(".originals-slide");

const buttons = document.querySelectorAll(".originals-carousel-button");

const width = carousel.clientWidth - 96;
let currentSlide = 0;

export default function OriginalsCarousel() {
  CarouselController();
}

function CarouselController() {
  buttons.forEach((button, currentButton) => {
    button.addEventListener("click", () => {
      if (currentButton === 1 && currentSlide === slides.length - 1) return;
      if (currentButton === 0 && currentSlide === 0) return;

      if (currentButton === 1) ++currentSlide;
      if (currentButton === 0) --currentSlide;

      CarouselMoveSlides();
    });
  });
}

function CarouselMoveSlides() {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(${-currentSlide * width}px)`;
  });
}
