import { auth, home } from 'lib/views.js'
(function main () {
  if (!sessionStorage.user) {
    auth()
  } else {
    home()
  }
}())

/* vim set tabstop=2 shiftwidth=2 expandtab */
