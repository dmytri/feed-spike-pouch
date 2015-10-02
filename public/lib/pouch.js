/* globals sessionStorage, riot, PouchDB, $ */

export function Pouch (db) {
  riot.observable(this)

  var _self = this
  var _db = null

  function _connection () {
    if (_db === null) _self.trigger('init')
    return _db
  }

  function _fetch () {
    _connection().allDocs({ include_docs: true }, function (err, response) {
      if (err) console.log(err)
      else {
        console.log(response)
        _self.items = response.rows
        _self.trigger('changes')
      }
    })
  }

  this.one('init', function init () {
    _db = new PouchDB(db)
    PouchDB.sync('feeds', 'http://localhost:5000/db/' + db, { live: true, retry: true })

    _db.changes({ live: true, since: 'now' }).on('change', function () { _fetch() })
    _fetch()
  })

  this.addDoc = function addDoc (href) {
    _connection().post({ href: href })
  }

  this.deleteDoc = function deleteDoc (docId) {
    _db.get(docId).then(function deleteGotDoc (doc) {
      _db.remove(doc)
    }).then(function deleteSuccess (result) {
      _self.trigger('changes')
    }).catch(function deleteError (err) {
      console.log(err)
    })
  }

  this.signout = function signout () {
    console.log('sign out')
    sessionStorage.removeItem('user')
    _self.trigger('signout')
  }

  this.items = []
}

/* vim set tabstop=2 shiftwidth=2 expandtab */
