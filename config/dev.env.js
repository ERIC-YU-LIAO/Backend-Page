'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')


// Testing API adress
// terminal 執行 npm run dev 
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APIPATH:'"https://vue-course-api.hexschool.io/"',
  NAME:'"test066"',
})
