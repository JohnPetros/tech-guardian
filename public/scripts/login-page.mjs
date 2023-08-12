import { Form } from "./modules/form.js"
import { Toast } from "./modules/toast.js"

new Form('[data-form]')

const toast = new Toast('[data-toast]')
toast.open()

