(function () {
  var h = window.h;
  var createClass = window.createClass;

  function value(entry, name, fallback) {
    var result = entry.getIn(['data', name]);
    return result === undefined || result === null || result === '' ? (fallback || '') : result;
  }

  function imageUrl(props, field) {
    var image = value(props.entry, field);
    if (!image) return '';
    var asset = props.getAsset(image);
    return asset && asset.toString ? asset.toString() : String(asset || '');
  }

  function shell(content, active) {
    return h('div', { className: 'preview-site' },
      h('header', { className: 'preview-header' },
        h('span', { className: 'preview-logo' }, 'Studio'),
        h('nav', {}, ['Artworks', 'About', 'Contact'].map(function (item) {
          return h('span', { className: item.toLowerCase() === active ? 'active' : '', key: item }, item);
        }))
      ),
      content,
      h('footer', { className: 'preview-footer' }, h('span', { className: 'preview-logo' }, 'Studio'), h('span', {}, 'All rights reserved'))
    );
  }

  var ArtworkPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var sold = Boolean(value(entry, 'sold'));
      var rows = [
        ['Artwork ID', value(entry, 'artworkId', 'AW-0000-000')],
        ['Year', value(entry, 'year', '—')],
        ['Size', value(entry, 'dimensions', '—')],
        ['Technique', value(entry, 'medium', '—')],
        ['Edition type', value(entry, 'edition', 'Unique')],
        ['Price', sold ? 'Sold' : value(entry, 'price', 'Price on request')],
        ['Certificate', value(entry, 'certificate', 'Certificate of Authenticity included')]
      ];
      return shell(h('main', { className: 'preview-main' },
        h('div', { className: 'preview-crumb' }, 'Artworks / ', h('b', {}, value(entry, 'artworkId', 'AW-0000-000'))),
        h('section', { className: 'preview-artwork' },
          h('div', { className: 'preview-art' }, imageUrl(this.props, 'image') ? h('img', { src: imageUrl(this.props, 'image'), alt: value(entry, 'alt') }) : h('span', {}, 'Choose an artwork image')),
          h('article', { className: 'preview-info' },
            h('h1', {}, value(entry, 'title', 'Untitled artwork')),
            h('p', { className: 'preview-year' }, value(entry, 'year')),
            h('span', { className: 'preview-status ' + (sold ? 'sold' : '') }, sold ? 'Sold' : 'Available'),
            h('dl', {}, rows.map(function (row) { return h('div', { key: row[0] }, h('dt', {}, row[0]), h('dd', {}, row[1])); })),
            h('p', { className: 'preview-description' }, value(entry, 'description')),
            h('span', { className: 'preview-button' }, sold ? 'Enquire about similar work' : 'Inquire / buy artwork')
          )
        )
      ), 'artworks');
    }
  });

  var AboutPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      return shell(h('main', { className: 'preview-main' },
        h('div', { className: 'preview-crumb' }, 'Studio / ', h('b', {}, 'About')),
        h('section', { className: 'preview-about' },
          h('div', { className: 'preview-photo' }, imageUrl(this.props, 'photo') ? h('img', { src: imageUrl(this.props, 'photo'), alt: value(entry, 'photoAlt') }) : h('span', {}, 'Choose a portrait')),
          h('article', { className: 'preview-story' }, h('small', {}, 'About the artist'), h('h1', {}, value(entry, 'name', 'Artist name')), h('p', { className: 'preview-intro' }, value(entry, 'introduction')), h('div', { className: 'preview-body' }, this.props.widgetFor('body')), h('span', { className: 'preview-link' }, 'Get in touch →'))
        )
      ), 'about');
    }
  });

  var ContactPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var rows = [['Phone', value(entry, 'phone')], ['Email', value(entry, 'email')], ['Instagram', 'View profile ↗'], ['Facebook', 'View profile ↗']];
      return shell(h('main', { className: 'preview-main preview-contact' },
        h('div', { className: 'preview-crumb' }, 'Studio / ', h('b', {}, 'Contact')),
        h('section', { className: 'preview-contact-layout' },
          h('div', {}, h('small', {}, 'Contact'), h('h1', {}, value(entry, 'heading', 'Let’s talk about art.'))),
          h('div', { className: 'preview-contact-details' }, h('p', { className: 'preview-intro' }, value(entry, 'introduction')), h('dl', {}, rows.map(function (row) { return h('div', { key: row[0] }, h('dt', {}, row[0]), h('dd', {}, row[1])); })))
        )
      ), 'contact');
    }
  });

  window.CMS.registerPreviewStyle('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
  window.CMS.registerPreviewStyle('/admin/preview.css');
  window.CMS.registerPreviewTemplate('artworks', ArtworkPreview);
  window.CMS.registerPreviewTemplate('about', AboutPreview);
  window.CMS.registerPreviewTemplate('contact', ContactPreview);
})();
