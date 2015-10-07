
import { Pouch } from 'lib/pouchdb.js'
import { auth_view } from 'lib/views.js'

(function () { auth_view(sessionStorage, Pouch) }())

/* vim set tabstop=2 shiftwidth=2 expandtab */
