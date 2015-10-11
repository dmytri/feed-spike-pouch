
var setup = require('../setup.js')
var tap = require('tap')

var riotdom = setup.riotdom
var StorageMock = setup.StorageMock

var Session = require('../../public/lib/models.js').Session
var storage = new StorageMock()
var session = new Session(storage)

riotdom('<html><body><user-signin></user-signin</body></html>', function (mount) {
  mount(__dirname + '/../../public/lib/tags/user-signin.tag', { model: session })

  tap.test('includes a signin and signout form', function (t) {
    t.ok($('#signinForm').length)
    t.ok($('#signoutForm').length)
    t.end()
  })

  tap.test('when signedin', function (t) {
    session.on('signedin', function () {
      t.test('the session model has test user set', function(tt) {
        tt.equal(session.signedin(), 'test_user')
        tt.end()
      })
      t.test('the signin form is not visible', function(tt) {
        tt.equal($('#signinForm').css('display'), 'none')
        tt.end()
      })
      t.test('the signout form is visible', function(tt) {
        tt.notEqual($('#signoutForm').css('display'), 'none')
        tt.end()
      })
      t.end()
    })
    $('#username').val('test_user')
    $('#_signinForm').submit()
    t.end()
  })

  tap.test('when signedout', function (t) {
    session.on('signedout', function () {
      t.test('the session model has no user set', function(tt) {
        tt.notOk(session.signedin())
        tt.end()
      })
      t.test('the signout form is not visible', function(tt) {
        tt.equal($('#signoutForm').css('display'), 'none')
        tt.end()
      })
      t.test('the signin form is visible', function(tt) {
        tt.notEqual($('#signinForm').css('display'), 'none')
        tt.end()
      })
    })
    $('#signoutForm').submit()
    t.end()
  })
})

/* vim set tabstop=2 shiftwidth=2 expandtab */
