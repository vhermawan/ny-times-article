const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl: 'http://localhost:9000',
    token: 'sqp_9bd2ec00bd46764b69907fe976a9692928e98d7d',
  },
  () => process.exit(),
);
