import { Form } from './modules/form.mjs'
import { Toast } from './modules/toast.mjs'
import { Modal } from './modules/modal.mjs'
import './modules/header.mjs'

const modal = new Modal('[data-modal]')

const userForm = new Form('[data-form]')

const toast = new Toast('[data-toast]')

const buttons = document.querySelectorAll('[data-button]')

const actionTitles = {
  delete: 'deletar',
  edit: 'editar',
}

function submitForm() {
  modal.close()

  userForm.removeErrors()
  userForm.validateFields()
  userForm.submit()
}

function hideInputPasswords() {
  const inputPasswords = userForm.getInputsByType('password')
  inputPasswords.forEach((input) => {
    input.type = 'hidden'
    input.value = ''
  })
}

function showInputPasswords() {
  const hiddenInputs = userForm.getInputsByType('hidden')

  if (!hiddenInputs.length) {
    hideInputPasswords()
    return
  }

  hiddenInputs.forEach((input) => (input.type = 'password'))
}

function handleButtonClick({ currentTarget }) {
  const isEditPasswordButton = currentTarget.id === 'edit-password'

  if (isEditPasswordButton) {
    showInputPasswords()
    return
  }

  const actionTitle = actionTitles[currentTarget.id]

  userForm.setAction(currentTarget.value)

  modal.setTitle(`Deseja ${actionTitle} essa conta?`)
  modal.setAction(actionTitle, submitForm)
  modal.open()
}

if (buttons.length) {
  buttons.forEach((button) =>
    button.addEventListener('click', handleButtonClick)
  )
}

toast.open()
