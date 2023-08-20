function getPreviousRoute(request) {
  return request.headers.referer.split(process.env.BASE_URL)[1]
}

module.exports = getPreviousRoute
