const carousel = document.querySelector(".exclusive-carousel");
const slides = document.querySelectorAll(".exclusive-slide");

const buttons = document.querySelectorAll(
  ".exclusive-controller-left, .exclusive-controller-right"
);

const oddBlocks = document.querySelectorAll(
  ".exclusive-block:nth-of-type(1), .exclusive-block:nth-of-type(3), .exclusive-block:nth-of-type(5), .exclusive-block:nth-of-type(6), .exclusive-block:nth-of-type(8), .exclusive-block:nth-of-type(10)"
);
const evenBlocks = document.querySelectorAll(
  ".exclusive-block:nth-of-type(2), .exclusive-block:nth-of-type(4), .exclusive-block:nth-of-type(7), .exclusive-block:nth-of-type(9)"
);

const width = carousel.clientWidth - 32;
let currentSlide = 0;

export default function ExclusiveCarousel() {
  CarouselController();
}

function CarouselController() {
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (index === 1 && currentSlide === slides.length - 1) return;
      if (index === 0 && currentSlide === 0) return;

      if (index === 0) --currentSlide;
      if (index === 1) ++currentSlide;

      CarouselMoveSlides(currentSlide);
    });
  });
}

function CarouselMoveSlides(index) {
  CarouselAnimations(0);

  setTimeout(() => {
    slides.forEach((slide) => {
      slide.style.translate = `${-index * width}px 0`;
    });
  }, 800);

  CarouselAnimations(805);
}

function CarouselAnimations(duration) {
  setTimeout(() => {
    oddBlocks.forEach((block) => {
      if (block.classList.contains("exclusive-block-fade-out-up")) {
        block.classList.remove("exclusive-block-fade-out-up");
        block.classList.add("exclusive-block-fade-in-down");
      } else {
        block.classList.remove("exclusive-block-fade-in-down");
        block.classList.add("exclusive-block-fade-out-up");
      }
    });

    evenBlocks.forEach((block) => {
      if (block.classList.contains("exclusive-block-fade-out-down")) {
        block.classList.remove("exclusive-block-fade-out-down");
        block.classList.add("exclusive-block-fade-in-up");
      } else {
        block.classList.remove("exclusive-block-fade-in-up");
        block.classList.add("exclusive-block-fade-out-down");
      }
    });
  }, duration);
}
