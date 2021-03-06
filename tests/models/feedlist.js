/* globals riot */

require('../setup.js')
var tap = require('tap')

var Pouch = require('../../public/lib/pouchdb.js').Pouch
var FeedList = require('../../public/lib/models.js').FeedList
var user_db = 'test_feeds_user'

var feed_list = new FeedList(Pouch, user_db, function () {
  feed_list.truncate(function () {
    test_events.trigger('db_ready')
  })
})

function TestEvents () {
  riot.observable(this)
}
var test_events = new TestEvents()

tap.test('can not add an invalid url', function (t) {
  var test_feed = 'this is not a valid url'
  t.throws(function () { feed_list.add(test_feed) })
  t.end()
})

test_events.one('db_ready', function () {
  tap.test('can add a valid url', function (t) {
    var test_feed = 'https://googleblog.blogspot.de/atom.xml'
    feed_list.add(test_feed, function (response) {
      t.test('my url is added', function (tt) {
        feed_list.get(response.id, function (doc) {
          tt.equal(doc.href, test_feed)
          tt.end()
        })
      })
      t.ok(response.ok)
      t.end()
    })
  })
})

/* vim set tabstop=2 shiftwidth=2 expandtab */
