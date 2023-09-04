export class Form {
  validations = [
    'validateEmail',
    'validatePassword',
    'validateRequired',
    'validateMinLength',
    'validateMaxLength',
    'validateLength',
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

    if (this.form) {
      this.inputs = this.form.querySelectorAll('[data-input]')
      this.textareas = this.form.querySelectorAll('[data-textarea]')
      this.radios = this.form.querySelectorAll('[data-radio]')
      this.radiosLabels = this.form.querySelectorAll('[data-radio-label]')
      this.selects = this.form.querySelectorAll('[data-select]')
      this.inputFiles = this.form.querySelectorAll('[data-input-file]')

      this.onTextareaKeyup = this.onTextareaKeyup.bind(this)
      this.onRadioLabelKeyDown = this.onRadioLabelKeyDown.bind(this)
      this.onInputFileChange = this.onInputFileChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
      this.form.addEventListener('submit', this.onSubmit)
    }

    if (this.textareas.length) {
      this.textareas.forEach((textarea) => {
        textarea.addEventListener('input', this.onTextareaKeyup)
        this.adjustTextareaSize(textarea)
      })
    }

    if (this.radiosLabels.length) {
      this.radiosLabels.forEach((label) =>
        label.addEventListener('keydown', this.onRadioLabelKeyDown)
      )
    }

    if (this.inputFiles.length) {
      this.inputFiles.forEach((input) =>
        input.addEventListener('change', this.onInputFileChange)
      )
    }
  }

  setAction(action) {
    this.form.action = action
  }

  setInputAvatar(inputAvatar, file) {
    const avatar = inputAvatar.querySelector('.avatar')

    console.log(avatar)

    const reader = new FileReader()
    reader.onload = ({ target }) => (avatar.src = target.result)
    reader.readAsDataURL(file)
  }

  submit() {
    const hasErrors = this.hasErrors()

    if (!hasErrors) {
      this.form.submit()
    }
  }

  adjustTextareaSize(textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  }

  onTextareaKeyup(event) {
    console.log(this)
    this.adjustTextareaSize(event.currentTarget)
  }

  getInputsByType(type) {
    return Array.from(this.inputs).filter((input) => input.type === type)
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

    if (input.value.length >= Number(min)) {
      return true
    }

    this.showError(
      `${input.placeholder} deve ter pelo menos ${min} caracteres`,
      input
    )
    return false
  }

  validateMaxLength(input, max) {
    this.removeErrors(input)

    if (input.value.length <= Number(max)) {
      return true
    }

    this.showError(
      `${input.placeholder} deve ter no máximo ${max} caracteres`,
      input
    )

    return false
  }

  validateLength(input, length) {
    this.removeErrors(input)

    if (input.value.length === Number(length)) {
      return true
    }

    this.showError(
      `${input.placeholder} deve ter exatamente ${length} caracteres`,
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
    const isPassword = this.passwordRegex.test(input.value)

    if (isPassword) {
      return true
    }

    this.showError(
      'Senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial.',
      input
    )
    return false
  }

  validateRadio(radio) {
    const hasCheckedOption = !!radio.value

    if (hasCheckedOption) {
      return true
    }

    this.showError('Marque uma opção', radio)
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
    if (input.type === 'hidden') {
      return
    }

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

  validateFields() {
    if (this.inputs.length) {
      this.inputs.forEach(this.sanitizeInputs, this)
      this.inputs.forEach(this.validateInput, this)
    }

    if (this.radios.length) {
      this.radios.forEach(this.sanitizeInputs, this)
      this.radios.forEach(this.validateRadio, this)
    }

    if (this.textareas.length) {
      this.textareas.forEach(this.sanitizeInputs, this)
      this.textareas.forEach(this.validateInput, this)
    }

    if (this.selects.length) {
      this.selects.forEach(this.sanitizeInputs, this)
      this.selects.forEach(this.validateSelect, this)
    }
  }

  sanitizeInputs(input) {
    if (input.value)
      input.value = input.value
        .trim()
        .replace(/[&<>"']/g, (match) => this.specialChars[match])
  }

  onRadioLabelKeyDown(event) {
    if (event.key === 'Enter') {
      event.currentTarget.click()
    }
  }

  onInputFileChange({ currentTarget }) {
    const file = currentTarget.files[0]
    this.setInputAvatar(currentTarget.parentElement, file)
  }

  onSubmit(event) {
    event.preventDefault()

    this.removeErrors()

    this.validateFields()

    this.submit()
  }
}
