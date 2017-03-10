// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  idm_server: '/keyrock',
  backend_sdk: 'http://localhost:9000/back-sdk',
//  client_id: 'd7d7a947a2744fa78f50ba33cb6f5885',
//  client_secret: '0135e79e67b3483d93f31cd13387b4bb'
  client_id: '71c1a6a1a7f24345946509f826cb445f',
  client_secret: '11ee4954366940a08e3565b34dea61d6'
};
