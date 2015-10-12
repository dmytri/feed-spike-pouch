;(function () {
  var express = require('express')
  var PouchDB = require('pouchdb')
  var app = express()

  //
  // Front End Assets
  app.use('/traceur'
    , express.static(__dirname + '/node_modules/traceur/bin'))
  app.use('/systemjs'
    , express.static(__dirname + '/node_modules/systemjs/dist'))
  app.use('/jquery'
    , express.static(__dirname + '/node_modules/jquery/dist'))
  app.use('/riot'
    , express.static(__dirname + '/node_modules/riot'))
  app.use('/riotgear'
    , express.static(__dirname + '/node_modules/riotgear'))
  app.use('/validator'
    , express.static(__dirname + '/node_modules/validator'))
  app.use('/pouchdb'
    , express.static(__dirname + '/node_modules/pouchdb/dist'))
  app.use('/'
    , express.static(__dirname + '/public'))

  // Database
  var InMemPouchDB = PouchDB.defaults({db: require('memdown')})
  app.use('/db',
    require('express-pouchdb')(InMemPouchDB))

  // config
  app.get('/config.json', function (request, response) {
    response.json({
      'db' : 'http://' + request.headers.host + '/db/'
    });
  })

  var port = process.env.PORT || 5000
  app.listen(port)

  console.log('listening on port ' + port)
}())

// vim set tabstop=2 shiftwidth=2 expandtab
