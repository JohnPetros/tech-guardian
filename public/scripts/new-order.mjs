import { Form } from './modules/form.mjs'
import { Toast } from './modules/toast.mjs'

new Form('[data-form]')

const toast = new Toast('[data-toast]')
toast.open()
