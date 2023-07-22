const carousel = document.querySelector(".details-carousel");
const slides = document.querySelectorAll(".details-slide");
const buttons = document.querySelectorAll(".details-controller-button");
const upperBlocks = document.querySelectorAll(".details-block.block-1");
const lowerBlocks = document.querySelectorAll(".details-block.block-2");

const width = carousel.clientWidth - 64;
let currentSlide = 0;

export default function DetailsCarousel() {
  CarouselController();
}

function CarouselController() {
  buttons.forEach((button, clickedButton) => {
    button.addEventListener("click", () => {
      if(clickedButton === 1 && currentSlide === slides.length - 1) return;
      if(clickedButton === 0 && currentSlide === 0) return;
      if(clickedButton === 0) --currentSlide;
      if(clickedButton === 1) ++currentSlide;
      CarouselMoveSlides(currentSlide);
    });
  });
}

function CarouselMoveSlides(index) {
  CarouselAnimation(0);

  setTimeout(() => {
    slides.forEach((slide) => {
      slide.style.transform = `translateX(${-index * width}px)`;
    });
  }, 600);

  CarouselAnimation(605);
}

function CarouselAnimation(duration) {
  setTimeout(() => {
    upperBlocks.forEach((upperBlock) => {
      if (upperBlock.classList.contains("details-block-fade-out-left")) {
        upperBlock.classList.add("details-block-fade-in-right");
        upperBlock.classList.remove("details-block-fade-out-left");
      } else {
        upperBlock.classList.add("details-block-fade-out-left");
        upperBlock.classList.remove("details-block-fade-in-right");
      }
    });

    lowerBlocks.forEach((lowerBlock) => {
      if (lowerBlock.classList.contains("details-block-fade-out-right")) {
        lowerBlock.classList.add("details-block-fade-in-left");
        lowerBlock.classList.remove("details-block-fade-out-right");
      } else {
        lowerBlock.classList.add("details-block-fade-out-right");
        lowerBlock.classList.remove("details-block-fade-in-left");
      }
    });
  }, duration);
}
