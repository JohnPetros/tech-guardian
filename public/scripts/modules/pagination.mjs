export class Pagination {
  constructor(pagination) {
    this.pagination = document.querySelector(pagination)

    this.pages = this.pagination.querySelectorAll('[data-page-number]')

    if (this.pages.length) {
      this.pages.forEach((page) => this.setPageLink(page))
    }
  }

  setPageLink(page) {
    const url = new URL(location.href)

    url.searchParams.delete('page')

    const currentUrl = url.toString()

    const operator = currentUrl.includes('?') ? '&' : '?'

    page.href = `${currentUrl}${operator}page=${page.dataset.pageNumber}`
  }
}
