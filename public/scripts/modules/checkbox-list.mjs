export class CheckboxList {
  constructor(checkboxList) {
    this.checkboxLists = document.querySelectorAll(checkboxList)

    this.onCheckboxlistButtonClick = this.onCheckboxlistButtonClick.bind(this)

    if (this.checkboxLists.length) {
      this.checkboxLists.forEach((checkbox) => {
        const checkboxButton = checkbox.querySelector('.checkbox-list-button')
        checkboxButton.addEventListener('click', this.onCheckboxlistButtonClick)
      })
    }
  }

  close() {
    this.checkboxLists.forEach((checkboxList) => {
      const checkboxes = checkboxList.querySelector('.checkboxes')
      checkboxes.classList.remove('open')

      const checks = checkboxes.querySelectorAll('.checkbox')
      checks.forEach((check) =>
        check.removeEventListener('keydown', this.onCheckKeydown)
      )
    })
  }

  open() {
    this.checkboxLists.forEach((checkboxList) => {
      const checkboxes = checkboxList.querySelector('.checkboxes')
      checkboxes.classList.add('open')

      const checks = checkboxes.querySelectorAll('.checkbox')
      checks.forEach((check) =>
        check.addEventListener('keydown', this.onCheckKeydown)
      )
    })
  }

  onCheckboxlistButtonClick({ currentTarget }) {
    const checkboxList = currentTarget.parentElement
    const checkboxes = checkboxList.querySelector('.checkboxes')

    const isOpen = checkboxes.classList.contains('open')

    if (isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  onCheckKeydown({ key, currentTarget }) {
    if (key === 'Enter') {
      currentTarget.click()
    }
  }
}
