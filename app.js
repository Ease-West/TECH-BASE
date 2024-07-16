var omikuji = new Array("稚内","与那国島","父島");
		
var number1 = Math.random();
var number2 = number1 * 3;
var number = Math.floor(number2);
var message = omikuji[number];

var object = document.getElementById("omikuji");
object.innerText = message;

document.addEventListener('DOMContentLoaded', () => {
    if (message==="稚内") {
        cityId = "011000";
    }
    if (message==="与那国島") {
        cityId = "474020";
    }
    if (message==="父島") {
        cityId = "130040";
    }
    // APIのURLを指定
    const apiUrl = `https://weather.tsukumijima.net/api/forecast?city=${cityId}`;

    // APIからデータを取得
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // データを表示するHTML要素を取得
            const weatherDataDiv = document.getElementById('weather-data');
            
            // 天気情報を抽出
            const location = data.location.city;
            const forecast = data.forecasts[0];
            const dateLabel = forecast.dateLabel;
            const telop = forecast.telop;
            const description = data.description.text;

            // データを表示
            weatherDataDiv.innerHTML = `
                <h4>${location}の天気</h4>
                <p>${dateLabel}: ${telop}</p>
                <p>${description}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('weather-data').innerHTML = '<p>Data could not be loaded.</p>';
        });
});
