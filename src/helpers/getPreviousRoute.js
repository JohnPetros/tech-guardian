function getPreviousRoute(request) {
  // console.log(request.headers);
  return request.headers.referer.split(process.env.BASE_URL)[1]
}

module.exports = getPreviousRoute
