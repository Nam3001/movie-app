const { override, useBabelRc } = require('customize-cra')

console.log(override, useBabelRc)

module.exports = override(useBabelRc())
