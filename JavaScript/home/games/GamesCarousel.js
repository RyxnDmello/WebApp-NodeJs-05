const carousel = document.querySelector(".games-carousel");
const slides = document.querySelectorAll(".games-slide");
const buttons = document.querySelectorAll(".games-controller-button");

export default function GamesCarousel() {
  CarouselController();
}

function CarouselController() {
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      CarouselMoveSlides(index);
    });
  });
}

function CarouselMoveSlides(index) {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(${-index * carousel.clientWidth}px)`;
  });
}
