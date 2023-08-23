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

  onCheckboxlistButtonClick({ currentTarget }) {
    const checkboxList = currentTarget.parentElement
    const checkboxes = checkboxList.querySelector('.checkboxes')
    checkboxes.classList.toggle('open')
  }
}
