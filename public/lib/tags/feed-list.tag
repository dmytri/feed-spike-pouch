<feed-list class="middle">

  <h3>Feeds</h3>

  <ul>
    <li each={ opts.items }>
        <form>
          <a href="#read/doc.href">{ doc.title || doc.href }</a>
          <button value="{ doc._id }" onclick="{ delete }">delete</button>
        </form>
    </li>
  </ul>

  <form onsubmit={ add }>
    <input name="input" onkeyup={ edit }>
    <button disabled={ !text }>Add #{ opts.items.length + 1 }</button>
  </form>

  <form onsubmit={ signout }>
    <button>signout</button>
  </form>

  <style>
    feed-list { display: block }
    feed-list h3 { font-size: 120% }
  </style>

  <script>

    var _self = this
    var feed_list = opts

    feed_list.on('changes', function feedListChanges () {
      console.log('update feed list')
      _self.update()
    })

    add(e) {
      if (this.text) {
        feed_list.addDoc(this.text)
        this.text = this.input.value = ''
      }
    }

    edit(e) {
      this.text = e.target.value
    }

    delete(e) {
      feed_list.deleteDoc(e.target.value)
    }

    signout(e) {
      feed_list.signout()
      this.unmount(true)
    }

  </script>

</feed-list>
