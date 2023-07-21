const blockButtons = document.querySelectorAll(".details-block-button");
const blockSlides = document.querySelectorAll(".details-block-point-slide");

let buttonGroups = [];
let slideGroups = [];

export default function DetailsPointsCarousel() {
  GenerateButtonGroups();
  GenerateSlidesGroups();
  CarouselController();
}

function CarouselController() {
  buttonGroups.forEach((group, groupIndex) => {
    group.forEach((button, buttonIndex) => {
      button.addEventListener("click", () => {
        CarouselMoveSlides(groupIndex, buttonIndex);
        ControllerAnimation(groupIndex, buttonIndex);
      });
    });
  });
}

function CarouselMoveSlides(groupIndex, buttonIndex) {
  SlideAnimation(groupIndex, 0);

  setTimeout(() => {
    slideGroups[groupIndex].forEach((slide) => {
      slide.style.transform = `translateX(${-buttonIndex * 568}px)`;
    });
  }, 400);

  SlideAnimation(groupIndex, 405);
}

function SlideAnimation(groupIndex, duration) {
  setTimeout(() => {
    slideGroups[groupIndex].forEach((slide) => {
      if (slide.classList.contains("details-block-point-slide-fade-out")) {
        slide.classList.remove("details-block-point-slide-fade-out");
        slide.classList.add("details-block-point-slide-fade-in");
      } else {
        slide.classList.remove("details-block-point-slide-fade-in");
        slide.classList.add("details-block-point-slide-fade-out");
      }
    });
  }, duration);
}

function ControllerAnimation(groupIndex, buttonIndex) {
  buttonGroups[groupIndex].forEach((button, currentButtonIndex) => {
    if (currentButtonIndex === buttonIndex) {
      button.style.scale = "1.2";
      button.style.opacity = "1";
    } else {
      button.style.opacity = "0.25";
      button.style.scale = "1";
    }
  });
}

function GenerateButtonGroups() {
  let group = [];

  for (let i = 0; i < blockButtons.length; i++) {
    if (group.length === 4) {
      buttonGroups.push(group);
      group = [];
    }

    group.push(blockButtons[i]);
  }

  buttonGroups.push(group);
}

function GenerateSlidesGroups() {
  let group = [];

  for (let i = 0; i < blockSlides.length; i++) {
    if (group.length === 4) {
      slideGroups.push(group);
      group = [];
    }

    group.push(blockSlides[i]);
  }

  slideGroups.push(group);
}
