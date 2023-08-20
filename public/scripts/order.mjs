import { Form } from './modules/form.mjs'
import { Toast } from './modules/toast.mjs'
import './modules/header.mjs'

const buttons = document.querySelectorAll('[data-button]')

const orderForm = new Form('[data-form]')

const toast = new Toast('[data-toast]')

function handleButtonClick({ currentTarget }) {
  orderForm.setAction(`/order/${currentTarget.value}`)

  orderForm.validateFields()
  orderForm.submit()
}

if (buttons.length) {
  buttons.forEach((button) =>
    button.addEventListener('click', handleButtonClick)
  )
}

toast.open()