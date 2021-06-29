import './sass/main.scss';
import countriesTpl from './hbs/countries-list.hbs';
import countryTpl from './hbs/country-card.hbs';
import fetchCountries from './js/fetchCountries.js';

var debounce = require('lodash.debounce');

const refs = {
    input: document.querySelector('.js-input'),
    countries: document.querySelector('.countries')
}

refs.input.addEventListener('input', debounce(onInputEnter, 500));

function onInputEnter(e) {
  const searchQuery = e.target.value;
  fetchCountries(searchQuery)
      .then(response => {
      return response.json();
      }).then(countries => {
       if (countries.length > 1) {
           const markUp = countriesTpl(countries);
           refs.countries.innerHTML = markUp;
       } else {
           const markUp = countryTpl(countries);
       refs.countries.innerHTML = markUp;
       }      
   }).catch(error => {
       console.log(error);
   });;       
}



