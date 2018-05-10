// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:57401/v1',
  WebUrl: 'http://localhost:4200/',
  linkPlataformaAutoria: 'http://localhost:57401/#/',
  // Url para o portal do MOIP.
  urlLoginMoip:'http://localhost:57401',
  urlInicialMoip:'http://localhost:57401', 
  apiUrlPortalAutoria:'http://localhost:57401/v1',

  urlTransposicao: 'http://localhost:4200/#/transposicao',
  
  urlEditorPreview: 'http://localhost:57401/#/preview'
};
