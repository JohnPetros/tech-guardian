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

  removeOverlay() {
    const overlay = document.querySelector('[data-checkbox-list-overlay]')
    overlay.remove()
  }

  addOverlay(checkboxList) {
    const overlay = document.createElement('span')
    overlay.classList.add('checkbox-list-overlay')
    overlay.setAttribute('data-checkbox-list-overlay', '')
    overlay.addEventListener('click', () => this.close(checkboxList))

    checkboxList.insertAdjacentElement('afterend', overlay)
  }

  close(checkboxList) {
    const checkboxes = checkboxList.querySelector('.checkboxes')
    checkboxes.classList.remove('open')

    const checks = checkboxes.querySelectorAll('.checkbox')
    checks.forEach((check) =>
      check.removeEventListener('keydown', this.onCheckKeydown)
    )

    this.removeOverlay()
  }

  open(checkboxList) {
    const checkboxes = checkboxList.querySelector('.checkboxes')
    checkboxes.classList.add('open')

    const checks = checkboxes.querySelectorAll('.checkbox')
    checks.forEach((check) =>
      check.addEventListener('keydown', this.onCheckKeydown)
    )

    this.addOverlay(checkboxList)
  }

  onCheckboxlistButtonClick({ currentTarget }) {
    const checkboxList = currentTarget.parentElement
    const checkboxes = checkboxList.querySelector('.checkboxes')

    const isOpen = checkboxes.classList.contains('open')

    if (isOpen) {
      this.close(checkboxList)
    } else {
      this.open(checkboxList)
    }
  }

  onCheckKeydown({ key, currentTarget }) {
    if (key === 'Enter') {
      currentTarget.click()
    }
  }
}
