import "@/sass/style.scss"
import '@/index.html'
import "@/img/user-icon.png"
import "@/sprites/dots.svg"
import "@/sprites/drop-down.svg"

import { createTaskItem } from "@/components/task-item/index.js"
import { createDefaultPage } from "@/components/default-page/index.js"

import { 
  toggleUserDropDownMenu,
  closeUserDropDownMenu,
  createNavBar,
  removeSelectedLink,
  selectClickedLink 
} from "@/components/navigation/index.js"

import { 
  createProjectItem,
  toggleBtnDropDownMenu,
  closeBtnDropDownMenu
} from "@/components/project-item/index.js"

let projectData = {
  title: 'Название',
  id: '#1',
  creator: 'Иванов И.И. создал(а) 17 сен 2022 в 13:55',
  editor: 'Баранов В.В. изменил(а) 1 минуту назад',
}

let taskData = {
  title: 'Название',
  id: '#1',
  creator: 'Иванов И.И. создал 1 час назад',
  editor: 'Баранов В.В. изменил(а) 1 минуту назад',
}

function initApp() {
  let app = document.querySelector('.app')
  const navBar = createNavBar()
  const projectItem = createProjectItem(projectData)
  const taskItem = createTaskItem(taskData)
  const defaultPage = createDefaultPage()
  app.insertAdjacentHTML("beforeend", navBar)
  app.insertAdjacentHTML("beforeend", projectItem )
  app.insertAdjacentHTML("beforeend", taskItem)
  app.insertAdjacentHTML("beforeend", defaultPage)
}

initApp()

window.onload = function () {
  document.addEventListener('click', (e) => {
    let clicked = e.target
    
    let clickedLink = clicked.closest('.navigation__link')
    if (clickedLink) {
      if (clickedLink.classList.contains('navigarion__link_active')) {
        return 
      } else {
        removeSelectedLink()
        selectClickedLink(clickedLink)
      }
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
    } else if (!clicked.closest('.button_small') && !clicked.closest('.drop-down-menu')) {
      closeBtnDropDownMenu()
    } 
  })
}




