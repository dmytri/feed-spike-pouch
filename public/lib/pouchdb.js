/* globals PouchDB */
;(function () {
  function Pouch (db_name, callback) {
    var db = new PouchDB(db_name)
    console.log('watch changes for ' + db_name)
    db.changes({ live: true, since: 'now' }).on('change', function () { fetch() })
    fetch()

    function fetch () {
      db.allDocs({ include_docs: true }, function (err, response) {
        if (err) console.log(err)
        else if (typeof callback === 'function') callback(response.rows)
      })
    }

    this.sync = function (url, opts) {
      console.log('sync ' + db_name + ' with ' + url)
      PouchDB.sync(db_name, url, opts).on('complete', function syncComplete () {
        console.log('sync complete')
      }).on('error', function (err) {
        console.log('sync error')
        console.log(err)
      }).on('change', function (info) {
        console.log('sync info')
        console.log(info)
      }).on('paused', function () {
        console.log('sync paused')
      }).on('active', function () {
        console.log('sync active')
      }).on('denied', function (info) {
        console.log('sync denied')
        console.log(info)
      })
    }

    this.truncate = function (callback) {
      db.destroy().then(function () {
        db = new PouchDB(db_name)
        if (typeof callback === 'function') callback()
      })
    }

    this.addDoc = function (doc, callback) {
      db.post(doc).then(function (response) {
        if (typeof callback === 'function') callback(response)
      }).catch(function (err) {
        console.log('post error')
        console.log(err)
      })
    }

    this.getDoc = function (id, callback) {
      db.get(id).then(function (response) {
        if (typeof callback === 'function') callback(response)
      }).catch(function (err) {
        console.log('get error')
        console.log(err)
      })
    }
    this.deleteDoc = function (docId) {
      db.get(docId).then(function (doc) {
        db.remove(doc)
      }).catch(function (err) {
        console.log(err)
      })
    }
  }

  module.exports = { Pouch: Pouch }
}())

/* vim set tabstop=2 shiftwidth=2 expandtab */
