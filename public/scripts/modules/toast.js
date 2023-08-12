export class Toast {
  constructor(toast) {
    this.toast = document.querySelector(toast)
    this.closeButton = this.toast.querySelector('.close')

    this.close = this.close.bind(this)
    this.closeButton.addEventListener('click', this.close)
  }

  close() {
    this.toast.classList.remove('open')
  }

  open() {
    this.toast.classList.add('open')
    setTimeout(() => this.close(), 3000)
  }
}
