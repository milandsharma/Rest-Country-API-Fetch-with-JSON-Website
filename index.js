let dropdown_btn = document.querySelector('.dropdown-toggle');
let up = document.querySelector('.dropdown-toggle .up');
let dropdown_menu_block = document.querySelector('.dropdown-menu');
let body = document.querySelector('body');
let countries = document.querySelector('.countries');
let day_nyt_btn = document.querySelector('.day-nyt');


let count = 0;


// fontAwesome day and nyt
let day_tag = document.createElement('i');
day_tag.className = "fa-solid fa-sun mode"
let nyt_tag = document.createElement('i');
nyt_tag.className = "fa-solid fa-moon mode"


// day and nyt toggle
day_nyt_btn.addEventListener('click', function () {
    count++
    if (count % 2 == 0) {
        day_nyt_btn.innerHTML = "<p>Dark Mode</p>";
        day_nyt_btn.appendChild(day_tag);
    } else {
        day_nyt_btn.innerHTML = "<p>Light Mode</p>";
        day_nyt_btn.appendChild(nyt_tag);
    }
})





// dropdown menu
dropdown_btn.addEventListener("click", () => {
    count++;
    if (count % 2 == 0) {
        dropdown_menu_block.style.display = "none";
        up.className = "fa-solid fa-angle-down"
    } else {
        dropdown_menu_block.style.display = "block";
        up.className = "fa-solid fa-angle-up";
    }
    setTimeout(() => {
        dropdown_menu_block.style.display = "none";
        up.className = "fa-solid fa-angle-down"
    }, 10000)
})
countries.addEventListener("click", () => {
    dropdown_menu_block.style.display = "none";
})


// card-component
let countriesElem = document.querySelector('.countries');

async function getCountry() {
    const url = await fetch("https://restcountries.com/v3.1/all");
    const res = await url.json();
    // console.log(res);
    res.forEach(element => {
        showCountry(element);
    })

}
getCountry();


function showCountry(data) {
    const country = document.createElement('div');
    country.classList.add("country");
    country.innerHTML = `<div class="country-img">
    <img class="flag" src="${data.flags.png}" alt="">
</div>
<div class="country-info">
    <h1>${data.name.official}</h1>
    <p><strong>Population: </strong>${data.population}</p>
    <p><strong>Region: </strong>${data.region}</p>
    <p><strong>Capital: </strong>${data.capital}</p>
</div>`
    countriesElem.appendChild(country);


    // country detail
    country.addEventListener("click", () => {
        countriesElem.remove()
        let countryModel = document.querySelector(".countryModel")
        let country_page = document.createElement('div');
        country_page.classList.add("country-page");
        country_page.innerHTML = `
        <div class="btn-con">
            <button class="back"><i class="fa-solid fa-arrow-left-long"></i>back</button>
        </div>
        <div class="main">
            <div class="flag">
                <img src="${data.flags.png}">
            </div>
            <div class="country-info-card">
                <h1>${data.name.official}</h1>
                <div class="country-info-main">
                    <div class="country-info-main-sub-left">
                        <p><strong>Native name : </strong>${data.name.common}</p>
                        <p><strong>Population : </strong>${data.population}</p>
                        <p><strong>Region : </strong>${data.region}</p>
                        <p><strong>Sub region : </strong>${data.subregion}</p>
                        
                    </div>
                    <div class="country-info-main-sub-right">
                    <p><strong>Capital : </strong>${data.capital}</p>
                        <p><strong>Currencies : </strong>${JSON.stringify(data.currencies)}</p>
                        <p><strong>Languages : </strong>${JSON.stringify(data.languages)}</p>
                    </div>
                </div>
            </div>
        </div>`
        countryModel.appendChild(country_page);

        // back button
        let back = document.querySelector(".back");
        back.addEventListener("click", () => {
            location. reload()
        })
    })




    // for dropdown
    let select = document.querySelectorAll('p');
    select.forEach(element => {
        element.addEventListener('click', function () {
            country.remove();
            if (data.region == element.innerText) {
                country.innerHTML = `<div class="country-img">
            <img class="flag" src="${data.flags.png}" alt="">
        </div>
        <div class="country-info">
            <h1 class="country-name">${data.name.official}</h1>
            <p><strong>Population: </strong>${data.population}</p>
            <p><strong>Region: </strong>${data.region}</p>
            <p><strong>Capital: </strong>${data.capital}</p>
        </div>`
                countriesElem.appendChild(country);
            } else {
                getCountry()
            }
        })
    })
}

