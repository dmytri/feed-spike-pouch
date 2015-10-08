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

  <rg-alert alerts="{ alerts }"></rg-alert>
  <form onsubmit={ add }>
    <input name="input" onkeyup={ edit }></input>
    <button disabled={ !text }>Add #{ opts.model.items.length + 1 }</button>
  </form>

  <rg-modal modal="{ modal }">Hello Modal</rg-modal>

  <style>
    feed-list { display: block }
    feed-list h3 { font-size: 120% }
  </style>

  <script>
    var self = this
    opts.model.on('unmount', function () {
      self.unmount(true)
    })

    add(e) {
      try { opts.model.add(this.text) }
      catch(e) { self.alerts.push({ type: 'danger', msg: e, timeout: 2000 }) }
    }

    edit(e) {
      this.text = e.target.value
      e.target.style['background-color'] = validator.isURL(this.text) ? '' : '#FFCED8'
    }

    delete(e) {
      opts.model.remove(e.target.value)
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
    this.alerts = []

  </script>

</feed-list>
