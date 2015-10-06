<user-signin class="middle">
  <h3>Sign In</h3>
  <form onsubmit={ signin }>
    <input onkeyup={ editUsername }></input>
    <button disabled={ !username }>OK</button>
  </form>

  <script>
    editUsername(e) {
      this.username = e.target.value
    }
    signin(e) {
      opts.model.signin(this.username)
      this.unmount(true)
    }
  </script>
</user-signin>
