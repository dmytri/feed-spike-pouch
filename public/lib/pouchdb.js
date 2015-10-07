/* globals PouchDB */

export function Pouch (db, callback) {

  var pouch = new PouchDB(db)
  console.log('watch changes for ' + db)
  pouch.changes({ live: true, since: 'now' }).on('change', function () { fetch() })
  fetch()

  function fetch () {
    pouch.allDocs({ include_docs: true }, function (err, response) {
      if (err) console.log(err)
      else {
        callback(response.rows)
      }
    })
  }

  this.sync = function (url, opts) {
    console.log('sync ' + db + ' with ' + url)
    PouchDB.sync(db, url, opts).on('complete', function syncComplete () {
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

  this.addDoc = function (doc) {
    pouch.post(doc).catch(function postError (err) {
      console.log('post error')
      console.log(err)
    })
  }

  this.deleteDoc = function (docId) {
    pouch.get(docId).then(function (doc) {
      pouch.remove(doc)
    }).catch(function (err) {
      console.log(err)
    })
  }

}

/* vim set tabstop=2 shiftwidth=2 expandtab */
