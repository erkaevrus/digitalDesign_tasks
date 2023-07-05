
function createProjectItem(projectData) {
  return ` 
    <div class="project-item-container">
      <div class="project-item">
        <p class="project-item__title">${projectData.title}</p>
        <div class="project-item__description">
          <div class="project-item__info">
            <p class="project-item__id">${projectData.id}</p>
            <p class="project-item__creator">${projectData.creator}</p>
          </div>
          <div class="project-item__state">
            <p class="project-item__editor">${projectData.editor}</p>
            <button class="button button_small button_secondary">
              <svg class="button__dots" width="4" height="14">
                <use xlink:href="#dots"></use>
              </svg>
            </button>
            <div class="drop-down-menu">
              <ul class="drop-down-menu__list">
                <li class="drop-down-menu__item">Редактировать</li>
                <li class="drop-down-menu__item">Удалить</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>`
}

const toggleBtnDropDownMenu = (contextBtn) => {
  contextBtn.nextElementSibling.classList.toggle('drop-down-menu_active')
  contextBtn.classList.toggle('button_secondary-active')

  if (contextBtn.closest('.task-item__state')) {
    contextBtn.closest('.task-item__state').classList.toggle('task-item__state_active')
  } else {
    contextBtn.closest('.project-item__state').classList.toggle('project-item__state_active')
  }
}

const closeBtnDropDownMenu = () => {
  document.querySelectorAll('.project-item__state .drop-down-menu_active').forEach(menu => {
    menu.classList.remove('drop-down-menu_active')
  })

  document.querySelectorAll('.task-item__state .drop-down-menu_active').forEach(menu => {
    menu.classList.remove('drop-down-menu_active')
  })

  document.querySelectorAll('.button_secondary-active').forEach(button => {
    button.classList.remove('button_secondary-active')
  })

  document.querySelectorAll('.task-item__state').forEach(item => {
    item.classList.remove('task-item__state_active')
  })

  document.querySelectorAll('.project-item__state').forEach(item => {
    item.classList.remove('project-item__state_active')
  })
}

export {createProjectItem, closeBtnDropDownMenu, toggleBtnDropDownMenu}