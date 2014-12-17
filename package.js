Package.describe({
  name: 'mpowaga:template-styles',
  summary: 'Reactive css for meteor templates',
  version: '0.1.0',
  git: 'https://github.com/mpowaga/meteor-template-styles'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.1');

  api.use([
  	'underscore',
  	'templating',
    'aldeed:template-extension@3.1.1'
  ], 'client');

  api.addFiles('template-styles.js', 'client');
});
