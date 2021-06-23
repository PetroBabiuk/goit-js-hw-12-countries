import './sass/main.scss';
import countriesTpl from './hbs/countries-list.hbs';
import countryTpl from './hbs/country-card.hbs';
var debounce = require('lodash.debounce');

const refs = {
    input: document.querySelector('.js-input'),
    container: document.querySelector('.container')
}

input.addEventListener('input', onInputEnter)

   const result = fetch(`https://restcountries.eu/rest/v2/name/romania`)
   .then(response => {
   return response.json();
   }).then(countries => {
       console.log(countries);
       if (countries.length > 1) {
           const markUp = countriesTpl(countries);
           console.log(markUp);
           refs.container.insertAdjacentHTML('beforeend', markUp);
       } else {
           const markUp = countryTpl(countries);
       console.log(markUp);
       refs.container.insertAdjacentHTML('beforeend', markUp);
       }
       
   }).catch(error => {
       console.log(error);
   });