const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl: 'http://localhost:9000',
    token: 'sqp_4af557105e55ffb0ac80532defb3376e608c835f',
  },
  () => process.exit(),
);
