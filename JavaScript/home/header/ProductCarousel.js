const button = document.querySelector(".header-information");
const carousel = document.querySelector(".header-carousel");
const slides = document.querySelectorAll(".header-carousel-slide");

let slideIndex = 0;

export default function ProductCarousel() {
  button.addEventListener("click", () => {
    if (slideIndex === 3) slideIndex = 0;
    else ++slideIndex;

    MoveSlides();
  });
}

function MoveSlides(index) {
  slides.forEach((slide) => {
    slide.style.translate = `${-index * carousel.clientWidth}px 0`;
  });
}
