(function () {
  var h = window.h;
  var value = function (entry, name) { return entry.getIn(['data'].concat(name.split('.'))) || ''; };
  var image = function (props, field) {
    var path = value(props.entry, field);
    return path ? h('img', { src: String(props.getAsset(path)), alt: '', style: { maxWidth: '100%', maxHeight: '480px', objectFit: 'contain' } }) : null;
  };
  function preview(kind, locale) {
    return window.createClass({ render: function () {
      var props = this.props, entry = props.entry;
      var v = function (name) { return value(entry, name); };
      var content;
      if (kind === 'home') content = h('div', {},
        h('section', { className: 'cms-hero' }, h('div', {}, h('h1', {}, v('title')), h('p', {}, v('subtitle')), h('p', {}, v('description')), h('span', { className: 'cms-button' }, v('button'))), image(props, 'heroImage'), h('div', {}, h('p', {}, v('motto')), h('h3', {}, v('heroTitle')), h('p', {}, v('heroSeries')))),
        h('section', {}, h('h2', {}, v('selectedTitle')), h('p', {}, locale === 'pl' ? 'Podgląd prac: pierwsze cztery dzieła oznaczone jako wybrane, według kolejności.' : 'Artwork snapshot: the first four works marked as selected, in display order.'), h('span', { className: 'cms-button' }, v('allButton'))),
        h('section', { className: 'cms-columns' }, h('div', {}, h('h2', {}, v('aboutHeadline')), h('p', {}, v('aboutDescription')), h('span', { className: 'cms-button' }, v('aboutButton'))), image(props, 'aboutImage'), h('p', {}, v('aboutCaption'))));
      if (kind === 'buy') {
        var steps = entry.getIn(['data', 'steps']);
        content = h('section', {}, h('h1', {}, v('title')), h('p', {}, v('introduction')), h('ol', {}, steps ? steps.map(function (step, index) { return h('li', { key: index }, h('h2', {}, step.get('title')), h('p', {}, step.get('description'))); }).toArray() : null), h('p', {}, v('closing')), h('span', { className: 'cms-button' }, v('button')));
      }
      if (kind === 'about') content = h('section', { className: 'cms-columns' }, image(props, 'photo'), h('div', {}, h('h1', {}, v('name')), h('p', {}, v('introduction')), props.widgetFor('body')));
      if (kind === 'contact') content = h('section', {}, h('h1', {}, v('heading')), h('p', {}, v('introduction')), ['phone', 'email', 'instagram', 'facebook'].map(function (field) { return h('p', { key: field }, v(field)); }));
      if (kind === 'artworks') content = h('section', { className: 'cms-columns' }, image(props, 'image'), h('div', {}, h('h1', {}, v('title')), h('p', {}, v('series')), h('p', {}, v('artworkId')), h('p', {}, v('description')), h('p', {}, v('sold') ? 'Sprzedane / Sold' : v('price')), h('p', {}, [v('year'), v('dimensions'), v('medium'), v('edition'), v('certificate')].filter(Boolean).join(' · ')), h('hr'), h('h2', {}, 'English'), h('h3', {}, v('en.title')), h('p', {}, v('en.series')), h('p', {}, v('en.description')), h('p', {}, [v('en.medium'), v('en.edition'), v('en.certificate')].filter(Boolean).join(' · '))));
      return h('div', { className: 'cms-preview' }, h('header', {}, 'ART FACTORY LINES', h('small', {}, locale.toUpperCase())), content);
    } });
  }
  window.CMS.registerPreviewStyle('/admin/preview.css');
  ['pl', 'en'].forEach(function (locale) { ['home', 'buy', 'about', 'contact'].forEach(function (kind) { window.CMS.registerPreviewTemplate(kind + '_' + locale, preview(kind, locale)); }); });
  window.CMS.registerPreviewTemplate('artworks', preview('artworks', 'pl'));
})();
