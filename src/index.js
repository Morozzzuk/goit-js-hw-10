//^ Add imports

import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries';

//^ Add consts
const DEBOUNCE_DELAY = 300;//* затримка для дебаунс 
const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

//^ Add EventListener
refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

//^Add Functions
let searchName = '';

function onInputSearch() {
  searchName = refs.input.value.trim();

  if (searchName === '') {
    clearAll();
    return;
  }

  fetchCountries(searchName)
    .then(country => {
      if (country.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.',
          {
            position: 'center-top',
          }
        );
        clearAll();
      } else if (country.length >= 2 && country.length < 10) {
        clearAll();
        renderListMarkup(country);
      } else if (country.length === 1) {
        clearAll();
        renderInfoMarkup(country);
      }
    })
    .catch(onError);
}

function onError(err) {
  clearAll();
  Notiflix.Notify.failure('Oops, there is no country with that name', {
    position: 'center-top',
  });
}

function renderInfoMarkup(country) {
  const infoMarkup = country
    .map(
      ({ flags, name, capital, population, languages }) => `<img src="${
        flags.svg
      }" alt="${flags.alt}" width="50" />
  <h2>${name.official}</h2>
  <ul>
    <li>
      <p><b>Capital:</b> ${capital}</p>
    </li>
    <li>
      <p><b>Population:</b> ${population}</p>
    </li>
    <li>
      <p><b>Languages:</b> ${Object.values(languages)} </p>
    </li>
  </ul>`
    )
    .join('');

  refs.countryInfo.innerHTML = infoMarkup;
}

function renderListMarkup(countries) {
  const listMarkup = countries
    .map(
      ({ flags, name }) =>
        `<li class="country-list__item">
        <img src="${flags.svg}" alt="${flags.alt}" width="40" height="30" />
        <p class="country-list__text">${name.official}</p>
      </li>`
    )
    .join('');

  refs.countryList.innerHTML = listMarkup;
}

function clearAll() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}


    
