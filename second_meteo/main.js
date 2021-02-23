const APIKEY = '6581d6ac7fdbcac4249294c2cbae568d';
let resultatsAPI;

const temps = document.querySelector('.temps')
const temperature = document.querySelector('.temperature')
const localisation = document.querySelector('.localisation')

const heure = document.querySelectorAll('.heure-nom-prevision')
const tempPourH = document.querySelectorAll('.heure-prevision-valeur')

const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');

const loader = document.querySelector('.overlay-icone-chargement')
const image = document.querySelector('.bloc-logo')


if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        let long = position.coords.longitude;
        let lat = position.coords.latitude;

        fetchAPI(long, lat)
    }, () => {
        alert(`Vous avez refusé la géolocalisation, l'application ne peur pas fonctionner, veuillez l'activer.!`)
    })
}

function fetchAPI(long, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${APIKEY}`)
    .then((reponse) => {
        return reponse.json()
    })
    .then((data) => {
        resultatsAPI = data;
        console.log(data)
        temps.innerText = resultatsAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`;
        localisation.innerText = resultatsAPI.timezone;
    })
}

// affichage de la températures toutes les 3h

let heureActuelle = new Date().getHours();

for (let i = 0 ; i < heure.length ; i ++) {
    
    let heureIncr = heureActuelle + i * 3

    if(heureIncr > 24) {
        heure[i].innerText = `${heureIncr - 24} h`
    } else if (heureIncr === 24) {
        heure[i].innerText = "OO h"
    } else {
        heure[i].innerText = `${heureIncr} h`
    }
}
for(let j = 0; j < tempPourH.length; j++) {
    tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 3].temp)}°`
}


// trois premieres lettres des jours 
const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
let ajd = new Date();
let options = { weekday: 'long' };
let jourActuel = ajd.toLocaleDateString('fr-FR', options);

jourActuel = jourActuel.charCodeAt(0) + jourActuel.slice(1)
let tabJoursEnOrdre = days.slice(days.indexOf(jourActuel)).concat(days.slice(0,days.indexOf(jourActuel)))
for(let k = 0; k < tabJoursEnOrdre.length; k++) {
    joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0,3);
}

// Temp par jour
for(let m = 0; m < 7; m++){
    tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m + 1].temp.day)}°`
}

