
/* eslint-disable no-undef */
riot = require('riot')
/* eslint-enable no-undef */

var tap = require('tap')

var Session = require('../public/lib/models.js').Session

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

var storage = new StorageMock()
var session = new Session(storage)

tap.test('can signin', { bail: true }, function (t) {
  session.on('signedin', function () {
    t.equal(session.signedin(), 'test')
    t.end()
  })
  session.signin('test')
})

tap.test('can signout', { bail: true }, function (t) {
  session.on('signedout', function () {
    t.equal(session.signedin(), undefined)
    t.end()
  })
  session.signout()
})

/* vim set tabstop=2 shiftwidth=2 expandtab */
