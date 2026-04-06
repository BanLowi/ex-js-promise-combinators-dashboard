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
        "city": destination[0]?.name ? destination[0]?.name : null,
        "country": destination[0]?.country ? destination[0]?.country : null,
        "weather": weather[0]?.weather_description ? weather[0]?.weather_description : null,
        "airport": airport[0]?.name ? airport[0]?.name : null,
        "temperature": weather[0]?.temperature ? weather[0]?.temperature : null
    }
}

getDashboardData('vienna')
    .then(data => {
        console.log('Dasboard data:', data);
        const cityLine = (data.city && data.country) ? `${data.city} is in ${data.country}.\n` : "";
        const weatherLine = data.temperature ? `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` : "";
        const airportLine = data.airport ? `The main airport is ${data.airport}.\n` : "";

        console.log(cityLine + weatherLine + airportLine);
    })
    .catch(error => console.error(error));