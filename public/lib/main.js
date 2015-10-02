/* globals sessionStorage */

import { auth_view, home_view } from 'lib/views.js'
(function main () {
  if (!sessionStorage.user) {
    console.log('signed out')
    auth_view()
  } else {
    console.log('signed in')
    home_view()
  }
}())

/* vim set tabstop=2 shiftwidth=2 expandtab */
