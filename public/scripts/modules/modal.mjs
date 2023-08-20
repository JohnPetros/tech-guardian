export class Modal {
  constructor(modal) {
    this.modal = document.querySelector(modal)
    this.title = this.modal.querySelector('.title')
    this.action = this.modal.querySelector('.action')
    this.cancel = this.modal.querySelector('.cancel')

    this.onClick = this.onClick.bind(this)
    this.onCancelClick = this.onCancelClick.bind(this)

    if (this.modal) {
      this.modal.addEventListener('click', this.onClick)
    }

    if (this.cancel) {
      this.cancel.addEventListener('click', this.onCancelClick)
    }
  }

  close() {
    this.modal.removeAttribute('open')
  }

  open() {
    this.modal.setAttribute('open', '')
  }

  setTitle(title) {
    if (this.title) this.title.innerText = title
  }

  setAction(actionTitle, actionPath) {
    if (this.action) {
      this.action.innerText = actionTitle
      this.action.href = actionPath
    }
  }

  onClick({ target }) {
    if (target.className === 'overlay') {
      this.close()
    }
  }

  onCancelClick() {
    this.close()
  }
}
