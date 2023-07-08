function createNavBar() {
  return `
    
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