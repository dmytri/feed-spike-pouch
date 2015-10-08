/* globals riot */
/* eslint-disable no-undef */
PouchDB = require('pouchdb')
validator = require('validator')
riot = require('riot')
/* eslint-enable no-undef */

var tap = require('tap')

var Pouch = require('../public/lib/pouchdb.js').Pouch
var FeedList = require('../public/lib/models.js').FeedList
var _user_db = 'test_feeds_user'

var feed_list = new FeedList(Pouch, _user_db, function () {
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

tap.test('can add a valid url', function (t) {
  test_events.one('db_ready', function () {
    var test_feed = 'https://googleblog.blogspot.de/atom.xml'
    feed_list.add(test_feed)
    t.test('my url is added', function (tt) {
      tt.equal(feed_list.items[0].doc.href, test_feed)
      tt.end()
    })
    t.end()
  })
})

/* vim set tabstop=2 shiftwidth=2 expandtab */
