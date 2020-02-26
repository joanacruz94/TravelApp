'use strict';

const { Router } = require('express');
const router = new Router();
const {TranslationServiceClient} = require('@google-cloud/translate');

const projectId = 'geoproject-268614';
const location = 'global';
const text = 'Hello World';


// Instantiates a client
const translationClient = new TranslationServiceClient();
async function translateText() {

    console.log('IM HEREEEEEE');
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



 
router.get('/', (req, res, next) => {

    res.render('utilities/main');
});

router.get('/recognition', (req, res, next) => {
    res.render('utilities/recognition');
});

router.get('/translation', (req, res, next) => {
    translateText();

    res.render('utilities/translation');
});

router.post('/translation', (req, res, next) => {
    const text = req.body.text;

});

module.exports = router;
