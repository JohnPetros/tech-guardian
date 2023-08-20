export class Toast {
  constructor(toast) {
    this.toasts = document.querySelectorAll(toast)

    this.closeButtons = [...this.toasts].map((toast) => {
      return toast.querySelector('.close')
    })

    this.closeButtons.forEach((button) => {
      button.addEventListener('click', this.close)
    })
  }

  closeAll() {
    this.toasts.forEach((toast) => toast.classList.remove('open'))
  }

  close() {
    this.parentElement.parentElement.classList.remove('open')
  }

  open() {
    this.toasts.forEach((toast) => toast.classList.add('open'))
    setTimeout(() => this.closeAll(), 5000)
  }
}
