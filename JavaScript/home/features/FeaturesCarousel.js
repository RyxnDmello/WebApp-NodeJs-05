const carousel = document.querySelector(".features-carousel");
const slides = document.querySelectorAll(".feature-slide");
const indicators = document.querySelectorAll(".feature-indicator");

const width = carousel.clientWidth - 40;
const duration = 550;

export default function FeaturesCarousel() {
  Controller();
}

function Controller() {
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      CarouselMoveSlides(index);
      IndicatorAnimation(index);
    });
  });
}

function CarouselMoveSlides(index) {
  SlidesAnimation(0);

  setTimeout(() => {
    slides.forEach((slide) => {
      slide.style.transform = `translateX(${-index * width}px)`;
    });
  }, duration);

  SlidesAnimation(duration);
}

function SlidesAnimation(duration) {
  setTimeout(() => {
    slides.forEach((slide) => {
      if (slide.classList.contains("feature-fade-out")) {
        slide.classList.remove("feature-fade-out");
        slide.classList.add("feature-fade-in");
      } else {
        slide.classList.remove("feature-fade-in");
        slide.classList.add("feature-fade-out");
      }
    });
  }, duration);
}

function IndicatorAnimation(currentIndex) {
  indicators.forEach((indicator, index) => {
    if (currentIndex === index) {
      indicator.style.backgroundColor = "#fff";
      indicator.style.opacity = 1;
    } else {
      indicator.style.backgroundColor = "transparent";
      indicator.style.opacity = 0.25;
    }
  });
}
