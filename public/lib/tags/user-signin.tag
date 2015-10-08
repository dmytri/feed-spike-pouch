<user-signin class="middle">
  <div id="signinForm">
    <h3>Sign In</h3>
    <form onsubmit={ signin }>
      <input onkeyup={ editUsername }></input>
      <button disabled={ !username }>OK</button>
    </form>
  </div>
  <form id="signoutForm" onsubmit={ signout }>
    <button>signout</button>
  </form>
  <style>
    #signoutForm {
      display: none;
    }
  </style>
  <script>
    editUsername(e) {
      this.username = e.target.value
    }
    signin(e) {
      $('#signinForm').hide()
      $('#signoutForm').show()
      opts.model.signin(this.username)
    }
    signout(e) {
      $('#signoutForm').hide()
      $('#signinForm').show()
      opts.model.signout()
    }
  </script>
</user-signin>
