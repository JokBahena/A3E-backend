const validationRecaptcha = (token) => {
  return new Promise((resolve, reject) => {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    fetch(verificationUrl, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((response) => {
        resolve(response);
      });
  });
};

module.exports = { validationRecaptcha };
