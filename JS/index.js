async function getPeople() {

    try {
        const res = await fetch('https://swapi.dev/api/people')
        const data = await res.json()
        const peopleData = await data.count;
        document.querySelector('.people').textContent = peopleData;

        console.log(data)
    }
    catch (error) {
        console.error('Erreur, impossible de trouver une forme de vie ici:', error);
    };
}

getPeople();

async function getVehicules() {

    try {
        const res = await fetch('https://swapi.dev/api/vehicles')
        const data = await res.json()
        const vehiculesData = await data.count;
        document.querySelector('.vehicules').textContent = vehiculesData;

        console.log(data)
    }
    catch (error) {
        console.error('Erreur, aucun véhicule, que des débris:', error);
    };
}

getVehicules();

async function getPlanets() {

    try {
        const res = await fetch('https://swapi.dev/api/planets')
        const data = await res.json()
        const planetsData = await data.count;
        document.querySelector('.planets').textContent = planetsData;

        console.log(data)
    }
    catch (error) {
        console.error('Erreur, L\'étoile noire a déjà tout détruit ici', error);
    };
}

getPlanets();