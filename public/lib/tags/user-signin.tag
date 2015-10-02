<user-signin class="middle">
  <h3>Sign In</h3>
  <form onsubmit={ signin }>
    <input onkeyup={ editUsername }></input>
    <button disabled={ !username }>OK</button>
  </form>

  <script>
    var _session = opts

    editUsername(e) {
      this.username = e.target.value
    }
    signin(e) {
      _session.signin(this.username)
    }
  </script>
</user-signin>
