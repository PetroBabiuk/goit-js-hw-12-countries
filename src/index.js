import './sass/main.scss';
import countriesTpl from './hbs/countries-list.hbs'

const refs = {
    input: document.querySelector('.js-input'),

}

   const result = fetch(`https://restcountries.eu/rest/v2/name/uk`)
   .then(response => {
   return response.json();
   }).then(countries => {
       console.log(countries);
       if (countries.length > 1) {
           const markUp = countriesTpl(countries);
           console.log(markUp);
       }
       const markUp = countryTpl(countries);
       
   }).catch(error => {
       console.log(error);
   });