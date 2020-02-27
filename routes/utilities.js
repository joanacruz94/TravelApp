'use strict';

const { Router } = require('express');
const router = new Router();
const {Translate} = require('@google-cloud/translate').v2;
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

router.get('/', (req, res, next) => {
  res.render('utilities/main');
});

router.get('/translation', (req, res, next) => {
  res.render('utilities/translation');
});

router.post('/translation', (req, res, next) => {
  const text = req.body.text;
    
  translateText(text)
  .then(() =>{
    res.render('utilities/translation', { translated, speak:true });
  })
  .catch(console.error);

});

module.exports = router;
