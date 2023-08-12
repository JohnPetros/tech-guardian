function formatMessages(type, errorMessages) {
  if (!errorMessages) return []

  return errorMessages
    .split(';')
    .map((message) => ({ type, body: message.split('-').join(' ') }))
}

module.exports = formatMessages
