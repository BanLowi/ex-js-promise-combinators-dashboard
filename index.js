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

    const [destination, weather, airport] = await Promise.allSettled([
        destinationPromise,
        weatherPromise,
        airportPromise
    ]);

    const result = {};

    if (destination.status === "rejected") {

        console.error(destination.reason);
    } else {

        const destinationCity = destination.value[0].name ? destination.value[0].name : null;
        const destinationCountry = destination.value[0].country ? destination.value[0].country : null;

        result.city = destinationCity;
        result.country = destinationCountry;
    }


    return result
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