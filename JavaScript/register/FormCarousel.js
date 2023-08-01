const carousel = document.querySelector(".register-form-carousel");
const forms = document.querySelectorAll(".register-form");

const buttons = document.querySelectorAll(".register-switch-button");

let width = carousel.clientWidth;
let currentSlide = 0;

export default function FormCarousel() {
  CarouselController();
}

function CarouselController() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentSlide === forms.length - 1) currentSlide = 0;
      else ++currentSlide;

      CarouselMoveSlides(currentSlide);
    });
  });
}

function CarouselMoveSlides(currentSlide) {
  CarouselAnimation(0, 100);

  setTimeout(() => {
    forms.forEach((form) => {
      form.style.transform = `translateX(${-currentSlide * width}px)`;
    });
  }, 750);

  CarouselAnimation(755, 100);
}

function CarouselAnimation(duration, delay) {
  setTimeout(() => {
    forms.forEach((form) => {
      const objects = form.querySelectorAll(
        ".register-form-header, .register-form-inputs, .register-form-buttons, .register-form-divider"
      );

      let delayDuration = 0;

      objects.forEach((object) => {
        setTimeout(() => {
          if (object.classList.contains("register-form-fade-out")) {
            object.classList.add("register-form-fade-in");
            object.classList.remove("register-form-fade-out");
          } else {
            object.classList.add("register-form-fade-out");
            object.classList.remove("register-form-fade-in");
          }
        }, delayDuration);

        delayDuration += delay;
      });
    });
  }, duration);
}
