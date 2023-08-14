export class Form {
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W\S]{6,}$/g
  specialChars = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  heightLimit = 80

  constructor(form) {
    this.form = document.querySelector(form)
    this.inputs = this.form.querySelectorAll('input')
    this.textareas = this.form.querySelectorAll('textarea')
    this.radios = this.form.querySelectorAll('[data-radio]')

    if (this.textareas.length) {
      this.textareas.forEach((textarea) => {
        textarea.addEventListener('keyup', this.onKeyUp)
        this.adjustSize(textarea)
      })
    }

    if (this.radios.length) {
      this.radios.forEach((radio) =>
        radio.addEventListener('keydown', this.onKeyDown)
      )
    }

    this.onKeyUp = this.onKeyUp.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.form.addEventListener('submit', this.onSubmit)
  }

  adjustSize(textarea) {
    textarea.style.height = ''
    textarea.style.height = textarea.scrollHeight + 'px'
  }

  onKeyUp(event) {
    this.adjustSize(event.currentTarget)
  }

  getInput(inputId) {
    return Array.from(this.inputs).find((input) => input.id === inputId)
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

  removeErrors() {
    const errors = this.form.querySelectorAll('.error')
    errors.forEach((error) => error.remove())
  }

  showError(errorMessage, input) {
    const inputContainer = input.parentElement

    const error = this.createError(errorMessage)

    inputContainer.insertAdjacentElement('afterend', error)
  }

  validateRequired(input) {
    if (input.value) {
      return true
    }

    this.showError('Preencha esse campo', input)
    return false
  }

  validateMinLength(input, min) {
    this.removeErrors(input)

    if (input.value.length >= min) {
      return true
    }

    this.showError('Nome de usuário deve ter pelo menos 3 caracteres', input)
    return false
  }

  validateEqual(input, targetInputId) {
    const targetInput = this.getInput(targetInputId)

    if (input.value === targetInput.value) {
      return true
    }

    this.showError('Senhas não conferem', input)
    return false
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

    for (const [validationType, validationValue] of Object.entries(
      validations
    )) {
      this[validationType](input, validationValue)
    }
  }

  sanitizeInputs(input) {
    input.value = input.value
      .trim()
      .replace(/[&<>"']/g, (match) => this.specialChars[match])
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      event.currentTarget.click()
    }
  }

  onSubmit(event) {
    event.preventDefault()

    this.removeErrors()

    this.inputs.forEach(this.sanitizeInputs, this)
    this.inputs.forEach(this.validateInput, this)

    const hasErrors = this.hasErrors()

    if (!hasErrors) {
      this.form.submit()
    }
  }
}
