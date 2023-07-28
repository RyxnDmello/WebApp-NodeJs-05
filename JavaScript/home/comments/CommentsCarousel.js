const container = document.querySelector(".comments-carousel-container");
const carousel = document.querySelector(".comments-carousel");
const slides = document.querySelectorAll(".comments-slide");
const buttons = document.querySelectorAll(".comments-controller-button");
const indicator = document.querySelector(".comments-controller-indicator");

const width = carousel.clientWidth - 64;

let isPaused = false;
let currentSlide = 0;

export default function CommentsCarousel() {
  CarouselAnimationController();
  CarouselButtonsController();
}

function CarouselAnimationController() {
  indicator.src = "/home/comments/resume.png";

  container.addEventListener("mouseover", () => {
    indicator.src = "/home/comments/pause.png";
    isPaused = true;
  });

  container.addEventListener("mouseout", () => {
    indicator.src = "/home/comments/resume.png";
    isPaused = false;
  });

  setInterval(() => {
    if (isPaused) return;

    if (currentSlide === slides.length - 1) currentSlide = -1;
    ++currentSlide;

    CarouselMoveSlides(currentSlide);
    CarouselButtonsAnimation(currentSlide);
  }, 5000);
}

function CarouselButtonsController() {
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      currentSlide = index;
      CarouselMoveSlides(currentSlide);
      CarouselButtonsAnimation(currentSlide);
    });
  });
}

function CarouselMoveSlides(index) {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(${-index * width}px)`;
  });
}

function CarouselButtonsAnimation(currentIndex) {
  buttons.forEach((button, index) => {
    if (index === currentIndex) {
      button.style.backgroundColor = "#fff";
      button.style.opacity = "1";
    } else {
      button.style.backgroundColor = "transparent";
      button.style.opacity = "0.25";
    }
  });
}
