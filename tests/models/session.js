
var setup = require('../setup.js')
var tap = require('tap')

var StorageMock = setup.StorageMock
var Session = require('../../public/lib/models.js').Session

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
