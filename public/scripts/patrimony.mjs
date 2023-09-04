import { Form } from './modules/form.mjs'
import { Toast } from './modules/toast.mjs'
import { Modal } from './modules/modal.mjs'
import './modules/header.mjs'

const modal = new Modal('[data-modal]')

const form = new Form('[data-form]')

const toast = new Toast('[data-toast]')

const buttons = document.querySelectorAll('[data-button]')

const actionTitles = {
  delete: 'deletar',
  edit: 'editar',
}

function submitForm() {
  modal.close()

  form.removeErrors()
  form.validateFields()

  form.submit()
}

function handleButtonClick({ currentTarget }) {
  const actionTitle = actionTitles[currentTarget.id]

  form.setAction(currentTarget.value)

  modal.setTitle(`Deseja ${actionTitle} esse patrimônio?`)
  modal.setAction(actionTitle, submitForm)
  modal.open()
}

if (buttons.length) {
  buttons.forEach((button) =>
    button.addEventListener('click', handleButtonClick)
  )
}

toast.open()
