function formatMessage(message) {
  const [type, body] = message.split(':')
  return { type, body: body.split('-').join(' ') }
}

module.exports = formatMessage