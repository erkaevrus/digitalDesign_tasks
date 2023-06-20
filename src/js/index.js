import "../sass/style.scss";
import '../index.html'
import { toggleUserDropDownMenu, closeUserDropDownMenu, createNavBar, removeSelectedLink, selectClickedLink } from "../components/navigation/index.js";
import { createDefaultPage } from "../components/default-page/index.js";
import { createProjectItem, toggleBtnDropDownMenu, closeBtnDropDownMenu } from "../components/project-item/index.js";
import {createTaskItem} from "../components/task-item/index.js"

import "@/img/user-icon.png"
import "@/sprites/dots.svg"
import "@/sprites/drop-down.svg"


const navBar = createNavBar()
const projectItem = createProjectItem()
const taskItem = createTaskItem()
const defaultPage = createDefaultPage()


function initApp() {
    let app = document.querySelector('.app');
    app.insertAdjacentHTML("beforeend", navBar);
    app.insertAdjacentHTML("beforeend", projectItem );
    app.insertAdjacentHTML("beforeend", taskItem);
    app.insertAdjacentHTML("beforeend", defaultPage);
}

initApp()

window.onload = function () {
  document.addEventListener('click', (e) => {
    let clicked = e.target
    
    let clickedLink = clicked.closest('.navigation__link')
    if (clickedLink) {
      removeSelectedLink()
      selectClickedLink(clickedLink)
    }

    if (clicked.closest('.user-button') && !clicked.classList.contains('drop-down-menu__item')) {
      toggleUserDropDownMenu()
    }

    if (!clicked.closest('.user-button')) {
      closeUserDropDownMenu()
    }

    let contextBtn = clicked.closest('.button_small')

    if (clicked.closest('.button_small')) {
      toggleBtnDropDownMenu(contextBtn)
    } else {
      closeBtnDropDownMenu()
    }
  })
}




