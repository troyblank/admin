import { ResourcesConfig } from 'aws-amplify';

export const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-west-2_2MIJDuwNb',
      userPoolClientId: 'vhhhksehmohvv090pmvuok8i1',
      identityPoolId: '',
    },
  },
} as ResourcesConfig;
