<feed-list class="middle">

  <h3>Feeds</h3>

  <ul>
    <li each={ opts.model.items }>
        <form>
          <a href="#read/doc.href" onclick={ showModal }>{ doc.title || doc.href }</a>
          <button value="{ doc._id }" onclick="{ delete }">delete</button>
        </form>
    </li>
  </ul>

  <form onsubmit={ add }>
    <input name="input" onkeyup={ edit }></input>
    <button disabled={ !text }>Add #{ opts.model.items.length + 1 }</button>
  </form>

  <form onsubmit={ signout }>
    <button>signout</button>
  </form>

  <rg-modal modal="{ modal }">Hello Modal</rg-modal>

  <style>
    feed-list { display: block }
    feed-list h3 { font-size: 120% }
  </style>

  <script>

    add(e) {
      if (this.text) {
        opts.model.add(this.text)
        this.text = this.input.value = ''
      }
    }

    edit(e) {
      this.text = e.target.value
    }

    delete(e) {
      opts.model.remove(e.target.value)
    }

    signout(e) {
      opts.model.signout()
      this.unmount(true)
    }

    showModal(e) {
      this.modal.visible = true
    }

    this.modal = {
        heading: 'Modal heading',
        visible: false,
        ghost: false,
        close: true,
        onclose: function (e) {}
    }

  </script>

</feed-list>
