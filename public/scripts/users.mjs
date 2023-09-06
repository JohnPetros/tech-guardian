import { Toast } from './modules/toast.mjs'
import { CheckboxList } from './modules/checkbox-list.mjs'
import { Pagination } from './modules/pagination.mjs'
import './modules/header.mjs'

const toast = new Toast('[data-toast]')
toast.open()

new CheckboxList('[data-checkbox-list]')

new Pagination('[data-pagination]')
