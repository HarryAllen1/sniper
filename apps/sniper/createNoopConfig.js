import { writeFileSync, existsSync } from 'fs';

if (!existsSync('./src/config.ts'))
  writeFileSync(
    './src/config.ts',
    `export const config = {
  token: '',
  clientID: '',
  prefixes: ['$', '%', '@sniper', '<@!893619442712444970>'],
  secrets: {
    topgg: '',
    topggToken:
      '',
  },
  apiKeys: {
    oxford: {
      appId: '',
      appKey: '',
    },
    mw: {
      apiKey: '',
    },
    dbl: {
      auth: '',
    },
    gpt3: '',
  },
  actServers: [
    '',
    '',
    '',
  ],
  firebase: {
    type: 'service_account',
    project_id: '',
    projectId: '',
    private_key_id: '',
    private_key:
      '',
    privateKey:
      '',
    client_email:
      '',
    clientEmail:
      '',
    client_id: '',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      '',
  },
} as const;

export default config;
`
  );
