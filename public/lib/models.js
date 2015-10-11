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
    var db = new Pouch(db_name, function (rows) {
      self.items = rows
      if (typeof callback === 'function') callback()
    })
    this.items = []
    this.sync = db.sync
    this.truncate = db.truncate
    this.remove = db.deleteDoc
    this.get = db.getDoc
    this.add = function (href, callback) {
      if (validator.isURL(href)) {
        db.addDoc({href: href}, function (response) {
          if (typeof callback === 'function') callback(response)
        })
      } else throw new Error('Enter a valid Atom or RSS URL')
    }
  }

  module.exports = { Session: Session, FeedList: FeedList }
}())

/* vim set tabstop=2 shiftwidth=2 expandtab */
