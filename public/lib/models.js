/* globals sessionStorage, riot */

import { DB } from 'lib/pouchdb.js'

export function Session () {
  riot.observable(this)
  var self = this
  this.signedin = function () {
    return sessionStorage['user']
  }

  this.signout = function (username) {
    sessionStorage.removeItem('user')
  }

  this.signin = function (username) {
    sessionStorage.setItem('user', username)
    self.trigger('signedin')
  }
}

export function FeedList (db, callback) {
  riot.observable(this)
  var self = this
  this.items = []
  this.db = new DB(db, function (rows) {
    self.items = rows
    callback()
  })
  this.db.sync('http://localhost:5000/db/' + db, { live: true, retry: true })
  this.getItems = function () {
    return this.items
  }
  this.remove = this.db.deleteDoc
  this.add = function (href) {
    self.db.addDoc({href: href})
  }
  this.signout = function () {
    self.trigger('signout')
  }
}

/* vim set tabstop=2 shiftwidth=2 expandtab */
