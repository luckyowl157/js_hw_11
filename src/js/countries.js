let debounce = require('lodash.debounce');
import {alert, success, error} from '@pnotify/core/dist/PNotify.js';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/Angeler.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/core/dist/Material.css";

class Country {
    constructor(uri) {
        this.uri = uri;
        this.input = document.querySelector(".js-country");
        this.showResult = document.querySelector('.js-result');
        this.inputValue = "";
        this.result = document.querySelector('.js-result');
        
    }

    fetchCountry = () => {
        let query = `${this.inputValue}`;
        let url = this.uri + "/" + query;

       fetch(url, {})
        .then((response) => response.json())
        .then((data) => {
            console.log('object', data);
            if(data.length > 2) {
                console.log('length', data.length);
                new alert({
                    title: "Make the request more specific",
                    delay: 10000
                });
                let countries = data;
                for (let country of countries) {
                    let countriesList = document.createElement('li');
                    let countriesFlag = document.createElement('span');
                    countriesList.className = 'countries';
                    countriesList.textContent = country.name.common;
                    let flags = country.flag;
                    countriesFlag.append(flags);
                    countriesList.append(countriesFlag);
                    this.result.append(countriesList);
                    console.log('single', country.name.common);
                }
                
                console.log('FullData', countries);
            } else {
                new success({
                    title: "Success",
                    type: "success",
                    delay: 10000
                });
                // название, столица, население, языки и флаг.
                let dataRes = data[0];
                // console.log('data', dataRes);
                let li = document.createElement("li");
                let p = document.createElement('p');
                let span = document.createElement('span');
                let spanCapital = document.createElement('span');
                let spanLang = document.createElement('span');
                
                p.textContent = dataRes.name.common;
                spanCapital.textContent = "Capital: " + dataRes.capital;
                spanLang.textContent = "Language: " + Object.values(dataRes.languages);
                // console.log('Cap', spanCapital);
                // console.log('Lang', spanLang);
                span.append(dataRes.flag)
                p.append(span);
                li.append(p, spanCapital, spanLang);
                this.result.append(li);
    
                return this.result;
            }
        })
        .catch((err) => {
            this.renderError(err);
            // console.log('qweeee',err);
        });
        
    };

    renderError(err) {
        // console.log(err);
        let errorMSG = "Try again!"
        new error({
            title: errorMSG,
            type: "error",
            delay: 10000
        });
    }

    onInputChange = (event) => {
        let inputValue = event.target.value;
        let lowName = this.inputValue = inputValue.toLowerCase();
        this.fetchCountry();
    };



    loadListeners = () => {
        this.input.addEventListener("input", debounce(this.onInputChange, 500));
    };

    init = () => {
        this.loadListeners();
    };
}
let URI = `https://restcountries.com/v3/name`;

new Country(URI).init();

export default {
    alert,
    success,
    error
}
