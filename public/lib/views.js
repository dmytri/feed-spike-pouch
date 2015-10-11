/* globals riot */

;(function () {
  var Session = require('lib/models.js').Session
  var FeedList = require('lib/models.js').FeedList

  function auth_view (storage, Pouch) {
    var session = new Session(storage)
    session.on('signedin', function () {
      home_view(session, Pouch)
    })
    riot.mount('user-signin', { model: session })
  }

  function home_view (session, Pouch) {
    if (session.signedin()) {
      session.on('signedout', function () {
        console.log('signedout')
        feed_list.trigger('unmount')
      })
      var user_db = 'feeds_user_' + session.signedin()
      var feed_list = new FeedList(Pouch, user_db, function () {
        console.log('mount feed-list')
        riot.mount('feed-list', { model: feed_list })
      })
      feed_list.sync('http://localhost:5000/db/' + user_db, { live: true, retry: true })
    }
  }

  module.exports = { auth_view: auth_view, home_view: home_view }
}())

/* vim set tabstop=2 shiftwidth=2 expandtab */
