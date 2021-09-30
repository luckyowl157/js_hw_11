let debounce = require('lodash.debounce');
import {alert, success, error} from '@pnotify/core';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/Material.css";
import "@pnotify/core/dist/Angeler.css";
import "@pnotify/core/dist/BrightTheme.css";


class Country {
    constructor (uri) {
        this.uri = uri;
        this.inputValue = "";
        this.input = document.querySelector(".js-country");
        this.result = document.querySelector('.js-result');
    }
    getCountries = () => {
        let query =  `${this.inputValue}`;
        let url =  this.uri + "/" + query;

        fetch(url)
        .then((response) => response.json())
        .then((data) => this.renderCountries(data))
        .catch((err) => this.renderError(err));
    }
    renderCountries = (data) => {
        let countriesArr;
        if(data.length === 1) {
            countriesArr = data.map(country => {
                new success({
                    title: `Success! We find country ${country.name}!`,
                    delay: 2000
                });
                return `<li class="country">
                <p><img src="${country.flag}" title="${country.name}" alt="${country.name}" class="countryFlag">Country: ${country.name}</p>
                <span>Capital: ${country.capital}</span>
                <span>Population: ${country.population}</span>
                <span>Languages: ${country.languages.map(language => language.name)}</span>
              </li>`;
            });
            this.result.innerHTML = countriesArr;
        };
        if(data.length > 2) {
            new alert({
                title: `Make the request more specific. We were find ${data.length} countries of you request`,
                delay: 1500
            });
            countriesArr = data.map(country => {
                return `<li class="country">
                <p><img src="${country.flag}" title="${country.name}" alt="${country.name}" class="countryFlag">Country: ${country.name}</p>
                <span>Capital: ${country.capital}</span>
                <span>Population: ${country.population}</span>
                <span>Languages: ${country.languages.map(language => language.name)}</span>
              </li>`;
            });
            this.result.innerHTML = countriesArr;
        };
        if(data.status === 404) {
            new error({
                title: 'Try again!',
                type: "error",
                delay: 500
            });
            return;
        }
        
    }
    inputSearch = (event) => {
        let inputValue = event.target.value;
        let lowName = this.inputValue = inputValue.toLowerCase();
        this.getCountries();
    }
    eListener = () => {
       this.input.addEventListener('input', debounce(this.inputSearch, 500));
    }
}

let URI = `https://restcountries.com/v2/name`;
new Country(URI).eListener();