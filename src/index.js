import './sass/main.scss';
import countriesTpl from './hbs/countries-list.hbs';
import countryTpl from './hbs/country-card.hbs';
var debounce = require('lodash.debounce');

console.log(debounce);
const refs = {
    input: document.querySelector('.js-input'),
    container: document.querySelector('.container')
}

refs.input.addEventListener('input', debounce(onInputEnter, 500));

function onInputEnter(e) {
      const searchQuery = e.target.value;
            console.log(`значение ${searchQuery}`);
      return searchQuery;
}

   const result = fetch(`https://restcountries.eu/rest/v2/name/uk`)
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