/*
In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:
Nome completo della città e paese da  /destinations?search=[query]
(result.name, result.country, nelle nuove proprietà city e country).
Il meteo attuale da /weathers?search={query}
(result.temperature e result.weather_description nella nuove proprietà temperature e weather).
Il nome dell’aeroporto principale da /airports?search={query}
(result.name nella nuova proprietà airport).
Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.
*/

const destinationsURL = "http://localhost:3333/destinations?search="
const weathersURL = "http://localhost:3333/weathers?search="
const airportsURL = "http://localhost:3333/airports?search="




async function getDashboardData(city) {

    const destinationPromise = fetch(`${destinationsURL}${city}`).then(obj => obj.json());
    const weatherPromise = fetch(`${weathersURL}${city}`).then(obj => obj.json());
    const airportPromise = fetch(`${airportsURL}${city}`).then(obj => obj.json());

    const [destination, weather, airport] = await Promise.all([
        destinationPromise,
        weatherPromise,
        airportPromise
    ]);

    return {
        "city": destination[0].name,
        "weather": weather[0].weather_description,
        "airport": airport[0].name,
        "temperature": weather[0].temperature
    }
}

getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));