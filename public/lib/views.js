/* globals sessionStorage, riot, PouchDB, $ */

import { Pouch } from 'lib/pouch.js'

export function auth_view () {
  function Session () {
    this.signin = function signin (username) {
      sessionStorage.setItem('user', username)
        home_view()
    }
  }
  var session = new Session()
  riot.mount('user-signin', session)
  console.log('auth_view')
}

export function home_view () {
  console.log('home_view')
  var _user_db = '/feeds/user/' + sessionStorage['user']
  var feed_list = new Pouch(_user_db)
  feed_list.on('signout', function () {
    auth_view()
  })
  riot.mount('feed-list', feed_list)
  feed_list.trigger('init')
}

/* vim set tabstop=2 shiftwidth=2 expandtab */
