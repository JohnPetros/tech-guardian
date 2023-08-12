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

  createError(errorMessage) {
    const error = document.createElement('p')
    error.classList.add('error')
    error.textContent = errorMessage
    return error
  }

  showError(errorMessage, input) {
    const error = this.createError(errorMessage)
    console.log(error)

    input.parentElement.insertAdjacentElement('afterend', error)
  }

  validateString(input) {
    if (this.stringRegex.test(input.value)) {
      return true
    }

    this.showError('Insira um texto válido', input)
    return false
  }

  validateRequired(input) {
    if (!input.value) {
      this.showError('Preencha esse campo', input)
    }
  }

  validateEmail(input) {
    if (this.emailRegex.test(input.value)) {
      return true
    }

    this.showError('E-mail inválido', input)
    return false
  }

  validatePassword(input) {
    if (this.passwordRegex.test(input.value)) {
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

    let validatedInputs = []

    for (const validation of Object.keys(validations)) {
      this[validation](input)
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
