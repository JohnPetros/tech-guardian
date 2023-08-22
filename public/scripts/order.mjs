import { Form } from './modules/form.mjs'
import { Toast } from './modules/toast.mjs'
import { Modal } from './modules/modal.mjs'
import './modules/header.mjs'

const modal = new Modal('[data-modal]#logout-modal')

const orderForm = new Form('[data-form]')

const toast = new Toast('[data-toast]')

const buttons = document.querySelectorAll('[data-button]')

const actionTitles = {
  delete: 'deletar',
  edit: 'editar',
  reopen: 'reabrir',
}

function submitForm() {
  modal.close()

  orderForm.removeErrors()
  orderForm.validateFields()
  orderForm.submit()
}

function handleButtonClick({ currentTarget }) {
  const isResolveButton = currentTarget.id === 'resolve'

  if (isResolveButton) {
    orderForm.setAction(currentTarget.value)
    submitForm()
    return
  }

  const actionTitle = actionTitles[currentTarget.id]

  orderForm.setAction(currentTarget.value)
  
  modal.setTitle(`Deseja ${actionTitle} essa solicitação?`)
  modal.setAction(actionTitle, submitForm)
  modal.open()
}

if (buttons.length) {
  buttons.forEach((button) =>
    button.addEventListener('click', handleButtonClick)
  )
}

toast.open()
