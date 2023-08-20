export class Form {
  validations = [
    'validateEmail',
    'validatePassword',
    'validateRequired',
    'validateMinLength',
    'validateEqual',
  ]

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
  heightLimit = 80

  constructor(form) {
    this.form = document.querySelector(form)
    this.inputs = this.form.querySelectorAll('[data-input]')
    this.textareas = this.form.querySelectorAll('[data-textarea]')
    this.radios = this.form.querySelectorAll('[data-radio]')
    this.selects = this.form.querySelectorAll('[data-select]')

    this.onTextareaKeyup = this.onTextareaKeyup.bind(this)
    this.onRadioKeyDown = this.onRadioKeyDown.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.form.addEventListener('submit', this.onSubmit)

    if (this.textareas.length) {
      this.textareas.forEach((textarea) => {
        textarea.addEventListener('input', this.onTextareaKeyup)
        this.adjustTextareaSize(textarea)
      })
    }

    if (this.radios.length) {
      this.radios.forEach((radio) =>
        radio.addEventListener('keydown', this.onRadioKeyDown)
      )
    }
  }

  adjustTextareaSize(textarea) {
    console.log(textarea)
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  }

  onTextareaKeyup(event) {
    console.log(this)
    this.adjustTextareaSize(event.currentTarget)
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

    console.log(inputContainer)

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

    this.showError(
      `${input.placeholder} deve ter pelo menos ${min} caracteres`,
      input
    )
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

  validateSelect(select) {
    const hasSelectedOption = select.value !== 'null'

    if (hasSelectedOption) {
      return true
    }

    this.showError('Selecione uma opção', select)
    return false
  }

  validateInput(input) {
    const validations = input.dataset

    for (const [validationType, validationValue] of Object.entries(
      validations
    )) {
      const isValidation = this.validations.includes(validationType)

      if (!isValidation) {
        continue
      }

      this[validationType](input, validationValue)
    }
  }

  sanitizeInputs(input) {
    input.value = input.value
      .trim()
      .replace(/[&<>"']/g, (match) => this.specialChars[match])
  }

  onRadioKeyDown(event) {
    if (event.key === 'Enter') {
      event.currentTarget.click()
    }
  }

  onSubmit(event) {
    event.preventDefault()

    this.removeErrors()

    if (this.inputs.length) {
      this.inputs.forEach(this.sanitizeInputs, this)
      this.inputs.forEach(this.validateInput, this)
    }

    if (this.selects.length) {
      this.selects.forEach(this.validateSelect, this)
    }

    const hasErrors = this.hasErrors()

    if (!hasErrors) {
      this.form.submit()
    }
  }
}
