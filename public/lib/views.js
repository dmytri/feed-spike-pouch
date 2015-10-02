/* globals riot, PouchDB */

export function auth () {
  function Session () {
    this.signin = function signin (username) {
      sessionStorage.setItem('user', username)
      $('user-signin').remove()
      home()
    } 
  }
  var session = new Session()
  riot.mount('user-signin', session)
}

export function home () {
  function Pouch (db) {
    riot.observable(this)

    var _self = this
    var _user_db = db + '/user/' + sessionStorage['user']
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
      _db = new PouchDB(_user_db)
      PouchDB.sync('feeds', 'http://localhost:5000/db/' + _user_db, { live: true, retry: true })

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
    this.items = []
  }

  var feed_list = new Pouch('feeds')
  riot.mount('feed-list', feed_list)
  feed_list.trigger('init')
}

/* vim set tabstop=2 shiftwidth=2 expandtab */
