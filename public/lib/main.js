/* globals sessionStorage */

import '/riot/riot+compiler.min.js'
import '/riotgear/dist/rg.min.js'

import { auth_view } from 'lib/views.js'
import { Pouch } from 'lib/pouchdb.js'

(function () { auth_view(sessionStorage, Pouch) }())

/* vim set tabstop=2 shiftwidth=2 expandtab */
