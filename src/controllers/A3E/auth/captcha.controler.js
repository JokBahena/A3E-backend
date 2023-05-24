const {recaptchaClient} = require('./../../../utils/reCaptcha')

app.post('/validar-recaptcha', async (req, res) => {
    const { token } = req.body;
  
    try {
      const recaptchaResponse = await recaptchaClient.verifyToken(token);
  
      if (recaptchaResponse.score >= 0.5) {
        // reCAPTCHA válido, realiza la lógica de tu aplicación
        res.json({ success: true });
      } else {
        // reCAPTCHA inválido
        res.json({ success: false, message: 'El reCAPTCHA es inválido.' });
      }
    } catch (error) {
      console.error('Error al verificar el reCAPTCHA:', error);
      res.json({ success: false, message: 'Error al verificar el reCAPTCHA.' });
    }
  });
  