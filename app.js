(function() {
  var express = require('express')
  var app = express()
  var PouchDB = require('pouchdb')
  
  // Front End
  app.use('/',
    express.static(__dirname + '/public'))

  // Database
  app.use('/db',
    require('express-pouchdb')(PouchDB))

  // Make Node Modules for JS libraries available
  app.use('/pouch',
    express.static(__dirname + '/node_modules/pouchdb/dist'))
  app.use('/riot',
    express.static(__dirname + '/node_modules/riot'))

  var port = process.env.PORT || 5000
  app.listen(port)

  console.log('listening on port ' + port)
}())

// vim set tabstop=2 shiftwidth=2 expandtab
