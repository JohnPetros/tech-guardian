import { Modal } from './modal.mjs'

const modal = new Modal('[data-modal]#logout-modal')

modal.setTitle('Deseja sair da sua conta?')
modal.setAction('Cagar', '/logout-user')

const logoutButton = document.querySelector('[data-logout-button]')

function handleLogoutButtonClick() {
  modal.open()
}

if (logoutButton)
  logoutButton.addEventListener('click', handleLogoutButtonClick)
