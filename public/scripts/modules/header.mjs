import { Modal } from './modal.mjs'

const modal = new Modal('[data-modal]')
const logoutButton = document.querySelector('[data-logout-button]')

function logoutUser() {
  if (logoutButton) {
    location.href = '/logout-user'
    modal.close()
  }
}

function handleLogoutButtonClick(event) {
  event.preventDefault()

  modal.setTitle('Deseja sair da sua conta?')
  modal.setAction('Sair', logoutUser)
  modal.open()
}

if (logoutButton)
  logoutButton.addEventListener('click', handleLogoutButtonClick)
