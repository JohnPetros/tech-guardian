import { Form } from './modules/form.mjs'
import { Toast } from './modules/toast.mjs'
import { Modal } from './modules/modal.mjs'
import './modules/header.mjs'

new Modal('[data-modal]')

new Form('[data-form]')

const toast = new Toast('[data-toast]')

toast.open()
