import { Form } from './modules/form.mjs'

const buttons = document.querySelectorAll('[data-button]')


const orderForm = new Form('[data-form]')


function handleButtonClick({ currentTarget }) {
  orderForm.setAction(`/order/${currentTarget.value}`)

  orderForm.validateFields()
  // orderForm.submit()
}

if (buttons.length) {
  buttons.forEach((button) =>
    button.addEventListener('click', handleButtonClick)
  )
}
