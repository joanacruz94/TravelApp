'use strict';

const { Router } = require('express');
const router = new Router();
const {TranslationServiceClient} = require('@google-cloud/translate');

const projectId = 'geoproject-268614';
const location = 'global';
const text = 'Hello World';

const nodemailer = require('nodemailer');

const EMAIL = 'joanamartadacruz@gmail.com';
const PASSWORD = 'JDamigos&';



// Instantiates a client
const translationClient = new TranslationServiceClient();
async function translateText() {

  // Construct request
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    contents: [text],
    mimeType: 'text/plain', // mime types: text/plain, text/html
    sourceLanguageCode: 'en',
    targetLanguageCode: 'pt'
  };

  try {
    // Run request
    const [response] = await translationClient.translateText(request);

    for (const translation of response.translations) {
    console.log('ola');
      console.log(`Translation: ${translation.translatedText}`);
    }
  } catch (error) {
    console.log(error);

    console.error(error.details);
  }
}


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


 
router.get('/', (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD
    }
  });
  
  transporter
    .sendMail({
      from: `Jan20 Test <${EMAIL}>`,
      to: EMAIL,
      subject: 'A test 😜 email',
      // text: 'Hello world!'
      html: 'Hello <strong>world</strong>'
    })
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
    res.render('utilities/main');
});

router.get('/recognition', (req, res, next) => {
    res.render('utilities/recognition');
});

router.get('/translation', (req, res, next) => {
    //translateText();


// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const msg = {
  to: 'joanamartadacruz@gmail.com',
  from: 'joanamartadacruz@gmail.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

console.log(msg);
sgMail.send(msg);


    res.render('utilities/translation');
});

router.post('/translation', (req, res, next) => {
    const text = req.body.text;

});




router.get('/', function (req, res) {
  sendEmail({
       toAddress: 'joanamartadacruz@gmail.com',
       subject: 'Email from SMTP sever',
       data: {  // data to view template, you can access as - user.name
          name: 'Arjun PHP',
          message: 'Welcome to arjunphp.com'
       },
       htmlPath: "welcome.pug"
   }).then(() => {
     return res.send('Email has been sent!');
   }).catch((error) => {
     return res.send('There was an error sending the email');
   })
});

const sendEmail = function(mailOptionsObject) {

  const msg = {
  to: mailOptionsObject.toAddress,
  from: 'joanamartadacruz@gmail.com',
  subject: mailOptionsObject.subject,
  html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  };

const status = sgMail.send(msg)
return status;

};

module.exports = router;
