function formatUrlParams(data) {
  return Object.entries(data).reduce((string, [key, value]) => {
    return string + `&${key}=${value.split(' ').join('-')}`
  }, '')
}

module.exports = formatUrlParams