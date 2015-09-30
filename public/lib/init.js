/* globals riot, PouchDB */

(function () {
  // FeedList stores the list of RSS Feeds
  function FeedList () {
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
      _db = new PouchDB('feeds')
      PouchDB.sync('feeds', 'http://localhost:5000/db/feeds', { live: true, retry: true })

      _db.changes({ live: true, since: 'now' }).on('change', function () {
        _fetch()
      })
      _fetch()
    })

    this.addFeed = function addFeed (href) {
      _connection().post({ href: href })
    }

    this.deleteFeed = function deleteFeed (docId) {
      var doc = _db.get(docId).then(function deleteFeedGotDoc (doc) {
        _db.remove(doc)
      }).then(function deleteFeedSuccess (result) {
        _self.trigger('changes')
      }).catch(function deleteFeedError (err) {
        console.log(err)
      })
    }
    this.items = []
  }

  var feed_list = new FeedList()
  feed_list.on('changes', function feedChanges () {
    console.log('update 1')
  })

  // Moount Tags
  riot.mount('feed-list', feed_list)

  // initialize db binding
  feed_list.trigger('init')
}())

/* vim set tabstop=2 shiftwidth=2 expandt */
