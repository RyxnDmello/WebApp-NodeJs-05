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
      ControllerAnimation(index);
    });
  });
}

function CarouselMoveSlides(index) {
  CarouselAnimation(0, 100);

  setTimeout(() => {
    slides.forEach((slide) => {
      slide.style.transform = `translateX(${-index * carousel.clientWidth}px)`;
    });
  }, 700);

  CarouselAnimation(800, 100);
}

function ControllerAnimation(index) {
  buttons.forEach((button, currentIndex) => {
    if (currentIndex === index) {
      button.style.translate = "0 -10px";
      button.style.opacity = 1;
    } else {
      button.style.translate = "0 0";
      button.style.opacity = 0.25;
    }
  });
}

function CarouselAnimation(duration, delay) {
  setTimeout(() => {
    slides.forEach((slide) => {
      const games = slide.querySelectorAll(".games-slide-title, .game");
      let delayDuration = 0;

      games.forEach((game) => {
        setTimeout(() => {
          if (game.classList.contains("game-fade-out")) {
            game.classList.remove("game-fade-out");
            game.classList.add("game-fade-in");
          } else {
            game.classList.remove("game-fade-in");
            game.classList.add("game-fade-out");
          }
        }, delayDuration);

        delayDuration += delay;
      });
    });
  }, duration);
}
