function formatTime(time) {
  return (
    time.toLocaleDateString('pt-BR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    }) +
    ' às ' +
    time.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  )
}

module.exports = formatTime