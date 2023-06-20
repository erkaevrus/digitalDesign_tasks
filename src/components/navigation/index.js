function createNavBar() {
  return `
    <header class="header">
      <div class="header__container">
        <div class="header__navigation">
          <ul class="navigation">
            <li class="navigation__link navigation__link_bordered"><a href="#">Проекты</a></li>
            <li class="navigation__link navigation__link_colored"><a href="#">Задачи</a></li>
            <li class="navigation__link navigation__link_bordered"><a href="#">Пользователи</a></li>
          </ul>
        </div>
        <div class="header__button">
          <div class="user-button"> 
            <div class="user-button__avatar">
              <img src="./image/user-icon.png" alt="avatar">
            </div>
            <div class="user-button__drop-down">
              <svg class="user-button__icon" width="14" height="8">
                <use xlink:href="#drop-down"></use>
              </svg>
            </div>
            <div class="drop-down-menu">
              <ul class="drop-down-menu__list">
                <li class="drop-down-menu__item">Профиль</li>
                <li class="drop-down-menu__item">Выход</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>`
}

const toggleUserDropDownMenu = () => {
  document.querySelector('.user-button .drop-down-menu').classList.toggle('drop-down-menu_active')
  document.querySelector('.user-button').classList.toggle('user-button_active')
}

const closeUserDropDownMenu = () => {
  document.querySelector('.user-button .drop-down-menu').classList.remove('drop-down-menu_active')
  document.querySelector('.user-button').classList.remove('user-button_active')
}

const removeSelectedLink = () => {
  document.querySelectorAll('.navigation__link').forEach(link => {
    link.classList.remove('navigation__link_active')
  })
}

const selectClickedLink = (clickedLink) => {
  clickedLink.classList.add('navigation__link_active')
}

export {createNavBar, toggleUserDropDownMenu, closeUserDropDownMenu, removeSelectedLink, selectClickedLink}