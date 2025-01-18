const chalk = require('chalk')
const semver = require('semver')
const packageConfig = require('../package.json')

function exec(cmd) {
  return require('node:child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  },
  {
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  }
]

module.exports = function () {
  const warnings = []
  for (const versionRequirement of versionRequirements) {
    const module_ = versionRequirement
    if (!semver.satisfies(module_.currentVersion, module_.versionRequirement)) {
      warnings.push(
        module_.name
        + ': '
        + chalk.red(module_.currentVersion)
        + ' should be '
        + chalk.green(module_.versionRequirement)
      )
    }
  }

  if (warnings.length > 0) {
    console.log('')
    console.log(
      chalk.yellow(
        'To use this template, you must update following to modules:'
      )
    )
    console.log()
    for (const warning of warnings) {
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  }
}
