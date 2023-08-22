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
  reopen: 'reabrir',
}

function submitForm() {
  modal.close()

  userForm.removeErrors()
  userForm.validateFields()
  userForm.submit()
}

function handleButtonClick({ currentTarget }) {
  const isResolveButton = currentTarget.id === 'resolve'

  if (isResolveButton) {
    userForm.setAction(currentTarget.value)
    submitForm()
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
