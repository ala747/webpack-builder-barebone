class SuppressEntryChunksPlugin {
  constructor(files, { filter = null, keep = false } = {}) {
    const fileList = Array.isArray(files) ? files : [files]
    this.filter = filter
    this.files = fileList.map(file => {
      if (typeof file === 'string') {
        return { name: file, match: null, keep: false }
      }
      return { match: null, keep: false, ...file }
    })
    this.keep = keep
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(
      this.constructor.name,
      (compilation) => {
        compilation.hooks.processAssets.tap({
          name: this.constructor.name,
          stage: compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
        }, () => {
          compilation.chunks.forEach(chunk => {
            if (this.files.map(file => file.name).includes(chunk.name)) {
              const { match, keep } = this.files.find(f => f.name === chunk.name);

              [...chunk.files]
                .filter(file => {
                  if (match !== null) {
                    const regexp = new RegExp(match)
                    return keep ? !regexp.test(file) : regexp.test(file)
                  } else if (this.filter !== null) {
                    const regexp = new RegExp(this.filter)
                    return this.keep ? !regexp.test(file) : regexp.test(file)
                  }
                  return true
                })
                .forEach(file => {
                  chunk.files = [...chunk.files].filter(f => f !== file)
                  delete compilation.assets[file]
                })
            }
          })
        })
      }
    )
  }
}

module.exports = SuppressEntryChunksPlugin
