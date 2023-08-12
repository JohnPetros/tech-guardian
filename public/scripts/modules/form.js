export class Form {
  stringRegex = /^[a-zA-Z\s]*$/
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W\S]{6,}$/g
  specialChars = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }

  constructor(form) {
    this.form = document.querySelector(form)
    this.inputs = document.querySelectorAll('input')

    this.onSubmit = this.onSubmit.bind(this)
    this.form.addEventListener('submit', this.onSubmit)
  }

  hasErrors() {
    return Boolean(this.form.querySelectorAll('.error').length)
  }

  createError(errorMessage) {
    const error = document.createElement('p')
    error.classList.add('error')
    error.textContent = errorMessage
    return error
  }

  removeErrors(input) {
    const errors = input.parentElement.parentElement.querySelectorAll('.error')
    errors.forEach((error) => error.remove())
  }

  showError(errorMessage, input) {
    const inputContainer = input.parentElement
    this.removeErrors(input)

    const error = this.createError(errorMessage)

    inputContainer.insertAdjacentElement('afterend', error)
  }

  validateRequired(input) {
    if (input.value) {
      this.showError('Preencha esse campo', input)
      return true
    }

    this.removeErrors(input)
    return false
  }

  validateEmail(input) {
    if (this.emailRegex.test(input.value)) {
      this.removeErrors(input)
      return true
    }

    this.showError('E-mail inválido', input)
    return false
  }

  validatePassword(input) {
    if (this.passwordRegex.test(input.value)) {
      this.removeErrors(input)
      return true
    }

    this.showError(
      'Senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial.',
      input
    )
    return false
  }

  validateInput(input) {
    const validations = input.dataset

    for (const validation of Object.keys(validations)) {
      this[validation](input)
    }

    if (!this.hasErrors()) {
      this.form.submit()
    }
  }

  sanitizeInputs(input) {
    input.value = input.value
      .trim()
      .replace(/[&<>"']/g, (match) => this.specialChars[match])
  }

  onSubmit(event) {
    event.preventDefault()

    this.inputs.forEach(this.sanitizeInputs, this)
    this.inputs.forEach(this.validateInput, this)
  }
}
