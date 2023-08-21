const carousel = document.querySelector(".originals-carousel");
const items = document.querySelectorAll(".originals-item");

const buttons = document.querySelectorAll(".originals-carousel-button");

let currentSlide = 0;

export default function OriginalsCarousel() {
  ButtonsController();
}

function ButtonsController() {
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (index === 1 && currentSlide === items.length - 1) {
        currentSlide = 0;
        CarouselMoveSlides();
        return;
      }

      if (index === 0 && currentSlide === 0) {
        currentSlide = items.length - 1;
        CarouselMoveSlides();
        return;
      }

      if (index === 1) ++currentSlide;
      if (index === 0) --currentSlide;

      CarouselMoveSlides();
    });
  });
}

function CarouselMoveSlides() {
  items.forEach((item) => {
    item.style.transform = `translateX(${
      -currentSlide * carousel.clientWidth
    }px)`;
  });
}
