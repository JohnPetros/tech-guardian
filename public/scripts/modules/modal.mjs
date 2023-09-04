export class Modal {
  constructor(modal) {
    this.modal = document.querySelector(modal)
    this.title = this.modal.querySelector('[data-title]')
    this.action = this.modal.querySelector('[data-action]')
    this.cancel = this.modal.querySelector('[data-cancel]')

    this.onActionClick = this.onActionClick.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onCancelClick = this.onCancelClick.bind(this)

    if (this.modal) {
      document.addEventListener('click', this.onClick)
    }

    if (this.cancel) {
      this.cancel.addEventListener('click', this.onCancelClick)
    }

    if (this.action) {
      this.action.addEventListener('click', this.onActionClick)
    }
  }

  close() {
    this.modal.close()
  }

  open() {
    this.modal.showModal()
  }

  setTitle(title) {
    if (this.title) this.title.innerText = title
  }

  setAction(actionTitle, actionHandler) {
    if (this.action) {
      this.action.innerText = actionTitle
      this.actionHandler = actionHandler
    }
  }

  onClick({ target }) {
    if (target.hasAttribute('data-modal')) {
      this.close()
    }
  }

  onCancelClick() {
    this.close()
  }

  onActionClick() {
    if (this.actionHandler) this.actionHandler()
  }
}
