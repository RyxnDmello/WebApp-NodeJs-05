const buttons = document.querySelectorAll(".nav-brand-link");
const menus = document.querySelectorAll(".nav-menu");

let activeMenu = -1;

export default function NavbarMenu() {
  MenuController();
}

function MenuController() {
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (activeMenu === index) {
        ControllerAnimation(-1);
        CloseMenu();

        activeMenu = -1;
        return;
      }

      if (activeMenu !== -1) CloseMenu();

      ControllerAnimation(index);
      OpenMenu(index);
    });
  });
}

function OpenMenu(index) {
  setTimeout(
    () => {
      menus[index].classList.remove("nav-menu-fade-out");
      menus[index].classList.add("nav-menu-fade-in");
      activeMenu = index;
    },
    activeMenu === -1 ? 0 : 350
  );
}

function CloseMenu() {
  menus[activeMenu].classList.remove("nav-menu-fade-in");
  menus[activeMenu].classList.add("nav-menu-fade-out");
}

function ControllerAnimation(index) {
  buttons.forEach((button, buttonIndex) => {
    if (buttonIndex === index) button.style.opacity = "1";
    else button.style.opacity = "0.5";
  });
}
