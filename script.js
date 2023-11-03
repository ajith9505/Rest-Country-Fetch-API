let api_url = "https://restcountries.com/v3.1/all";

function country(data) {

    let row = document.getElementById('row');

    data.map((obj) => {

        try {
            let column = document.createElement('div');
            column.classList.add('col-sm-6');
            column.classList.add('col-md-4');
            column.classList.add('col-lg-4');
            column.classList.add('col-xl-4');
            column.setAttribute('id', 'column');
            row.appendChild(column);

            let card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('h-100')
            column.append(card);

            let header = document.createElement('div');
            header.classList.add('card-header');
            header.innerText = obj.name.common;
            card.appendChild(header);

            let flag = document.createElement('img');
            flag.classList.add('card-img-top');
            flag.setAttribute('src', obj.flags.png);
            flag.setAttribute('alt', 'Loding...');
            card.appendChild(flag);

            let body = document.createElement('div');
            body.classList.add('card-body');
            card.appendChild(body);

            let capital = document.createElement('div');
            capital.classList.add('card-text');
            capital.innerText = `Capital : ${obj.capital[0]}`;
            body.appendChild(capital);

            let region = document.createElement('div');
            capital.classList.add('card-text');
            region.innerText = "Region : " + obj.region;
            body.appendChild(region);

            let country_code = document.createElement('div');
            capital.classList.add('card-text');
            country_code.innerText = `Country Code : ${obj.cca3}`;
            body.appendChild(country_code);

            var lat = obj.latlng[0];
            var lng = obj.latlng[1];
            column.setAttribute("lat", lat);
            column.setAttribute("lng", lng);

            let weather_button = document.createElement('a');
            weather_button.setAttribute('href', '#');
            weather_button.setAttribute('id', 'button')
            weather_button.classList.add('btn');
            weather_button.classList.add('btn-primary');
            weather_button.innerText = "Click For Weather";
            body.appendChild(weather_button);
            weather_button.setAttribute("onclick", `getWeather(${lat},${lng})`);
        }
        catch (err) {
            console.log(err);
        }
    });
}

async function getWeather(lat, lng) {
    const api = "19a8470a463433487b03f8f82158f8e9";
    weather_api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api}`;

    let weather_data = await fetch(weather_api)
    let data = await weather_data.json();
    console.log(data);
    alert(`
               ${data.name}  
               Weather : ${data.weather[0].main}
               Temprature : ${data.main.temp}
               Humidity : ${data.main.humidity}
               Pressure : ${data.main.pressure}
               `)
};

async function fetch_data() {
    let resource = await fetch(api_url);
    let data = await resource.json();
    country(data);
};


fetch_data();