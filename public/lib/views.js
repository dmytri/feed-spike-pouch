/* globals riot */

import { Session, FeedList } from 'lib/models.js'

export function auth_view () {
  var session = new Session()
  session.on('signedout', function () {
    session.signout()
    riot.mount('user-signin', { model: session })
  })
  session.on('signedin', function () {
    home_view(session)
  })
  if (session.signedin()) session.trigger('signedin')
  else session.trigger('signedout')
}

export function home_view (session) {
  if (!session.signedin()) session.trigger('signedout')
  else {
    var _user_db = 'feeds_user_' + session.signedin()
    var feed_list = new FeedList(_user_db, function () {
      riot.mount('feed-list', { model: feed_list })
    })
    feed_list.on('signout', function () {
      session.trigger('signedout')
    })
  }
}

/* vim set tabstop=2 shiftwidth=2 expandtab */
