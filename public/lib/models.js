/* globals riot, validator */

;(function () {
  function Session (storage) {
    riot.observable(this)
    var self = this
    this.signedin = function () {
      return storage.getItem('user')
    }

    this.signout = function (username) {
      storage.removeItem('user')
      self.trigger('signedout')
    }

    this.signin = function (username) {
      storage.setItem('user', username)
      self.trigger('signedin')
    }
  }

  function FeedList (Pouch, db_name, callback) {
    riot.observable(this)
    var self = this
    this.items = []
    this.db = new Pouch(db_name, function (rows) {
      self.items = rows
      if (typeof callback === 'function') callback()
    })
    this.truncate = this.db.truncate
    this.remove = this.db.deleteDoc
    this.add = function (href) {
      if (validator.isURL(href)) self.db.addDoc({href: href})
      else throw new Error('Enter a valid RSS or Atom URL')
    }
  }

  module.exports = { Session: Session, FeedList: FeedList }
}())

/* vim set tabstop=2 shiftwidth=2 expandtab */
