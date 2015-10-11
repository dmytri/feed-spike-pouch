/* globals riot */
/* eslint-disable */
validator = require('validator')
riot = require('riot')
var _PouchDB = require('pouchdb')
PouchDB = _PouchDB.defaults({db: require('memdown')});
/* eslint-enable */

var fs = require('fs')

function riotdom (html, callback) {
  var jsdom = require('jsdom')
  jsdom.env({
    html: html,
    scripts: [
      __dirname + '/../node_modules/jquery/dist/jquery.min.js',
      __dirname + '/../node_modules/riot/riot+compiler.min.js'
    ],
    features: {
      FetchExternalResources: ['script'],
      ProcessExternalResources: ['script']
    },
    done: function (errors, window) {
      if (errors != null) console.log('Errors', errors)
      /* eslint-disable */
      $ = window.$
      riot = window.riot
      /* eslint-enable */
      function mount (tagfile, opts) {
        var def = fs.readFileSync(tagfile).toString()
        /* eslint-disable */
        eval(riot.compile(def))
        /* eslint-enable */
        return riot.mount('user-signin', opts)[0]
      }
      if (typeof callback === 'function') callback(mount)
    }
  })

}

function StorageMock () {
  var store = {}
  this.setItem = function (item, value) {
    store[item] = value
  }
  this.getItem = function (item) {
    return store[item]
  }
  this.removeItem = function (item) {
    delete store[item]
  }
}

module.exports = { riotdom: riotdom, StorageMock: StorageMock }

/* vim set tabstop=2 shiftwidth=2 expandtab */
