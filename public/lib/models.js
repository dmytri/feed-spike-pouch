/* globals sessionStorage, riot */


export function Session (storage) {
  riot.observable(this)
  var self = this
  this.signedin = function () {
    return storage['user']
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

export function FeedList (Pouch, db_name, callback) {
  riot.observable(this)
  var self = this
  this.items = []
  this.db = new Pouch(db_name, function (rows) {
    self.items = rows
    callback()
  })
  this.db.sync('http://localhost:5000/db/' + db_name, { live: true, retry: true })
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
