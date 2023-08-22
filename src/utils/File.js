const fs = require('fs')
const path = require('path')
const uploadConfig = require('../configs/uploadConfig')

class File {
  getFilePath(folder, filename) {
    return path.resolve(uploadConfig.UPLOAD_FOLDER, folder, filename)
  }

  async delete(folder, filename) {
    const filePath = this.getFilePath(folder, filename)

    try {
      await fs.promises.stat(filePath)
    } catch (error) {
      return
    }

    await fs.promises.unlink(filePath)
  }

  async save(folder, filename) {
    const filePath = this.getFilePath(folder, filename)

    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, filename),
      path.resolve(filePath)
    )
  }
}

module.exports = File
