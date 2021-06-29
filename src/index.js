import './sass/main.scss';
import countriesTpl from './hbs/countries-list.hbs';
import countryTpl from './hbs/country-card.hbs';
import fetchCountries from './js/fetchCountries.js';
import debounce from 'lodash.debounce';
import {  info, success, error, defaults } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
defaults.delay = 2000;

const refs = {
    input: document.querySelector('.js-input'),
    countries: document.querySelector('.countries')
}

refs.input.addEventListener('input', debounce(onInputEnter, 500));

function onInputEnter(e) {
    e.preventDefault();
    const searchQuery = e.target.value;
    if (searchQuery === '') {
        const myInfo = info({
            text: 'Please, enter the name of country for searching.'
        });
        return
    }
     fetchCountries(searchQuery)
         .then(responseJSON)
         .then(renderMarkUpInDependingOfContriesLength)
         .catch(ifError);;       
}

function responseJSON(response) {
  if (response.status === 404) {
    const myError = error({
    text: 'Something was wrong, please try again'  
    });
    refs.countries.innerHTML = ''
  }
  return response.json();
}

function renderMarkUpInDependingOfContriesLength(countries) {
  if (countries.length === 0) {
    refs.countries.innerHTML = '';
  } else if (countries.length > 10) {
    const myInfo = info({
      text: 'The answer has more than 10 countries - Try check search'
    });
    refs.countries.innerHTML = '';
  } else if (countries.length > 1 && countries.length <= 10) {
    const myInfo = info({
      text: 'Here are countries - appropriate search.'
    });
    const markUp = countriesTpl(countries);
    refs.countries.innerHTML = markUp;
  } else if (countries.length === 1){
    const mySuccess = success({
      title: 'Success',
      text: 'The country you were looking for.'  
    });   
    const markUp = countryTpl(countries);
    refs.countries.innerHTML = markUp;
  }
}

function ifError(err) {
    console.log(err);
    const myError = error({
    text: 'Something was wrong, please try again.'  
    });
    refs.countries.innerHTML = '';
}
