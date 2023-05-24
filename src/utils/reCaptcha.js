const { RecaptchaEnterpriseClient } = require('google-recaptcha-enterprise');

const recaptchaClient = new RecaptchaEnterpriseClient({
  siteKey: '6LfjQDkmAAAAAKD5prSpRARCBrdTTopN8oyT-swh',
  projectId: 'pruebasa3e-1684954324233',
});

module.exports = {recaptchaClient}

