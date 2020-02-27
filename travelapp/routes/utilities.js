'use strict';

const { Router } = require('express');
const router = new Router();
const {Translate} = require('@google-cloud/translate').v2;
const vision = require('@google-cloud/vision');
const translate = new Translate();
const target = 'en';
let translated = '';


async function translateText(text) {
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  translations.forEach((translation, i) => {
    console.log(`${text[i]} => (${target}) ${translation}`);
    translated = translation;
  });
}

async function quickstart() {
  // Imports the Google Cloud client library

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  const [result] = await client.labelDetection('./cat.jpg');
  const labels = result.labelAnnotations;
  console.log('Labels:');
  labels.forEach(label => console.log(label.description));
}

router.get('/', (req, res, next) => {
  res.render('utilities/main');
});


router.get('/translation', (req, res, next) => {
  res.render('utilities/translation');
});

router.post('/translation', (req, res, next) => {
    const text = req.body.text;
    
    translateText(text).
    then(() =>{
      console.log('hhhhjjjjh');
      console.log('hgggggggggggggggg', translated);
      res.render('utilities/translation', { translated });
    })
    .catch(console.error);

});

router.get('/recognition', (req, res, next) => {
    quickstart();
    //res.render('utilities/recognition');
});








module.exports = router;
