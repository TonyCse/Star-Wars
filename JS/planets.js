// DATA SELECT INPUT ET TABLE
const planetSelect = document.querySelector('.planet-select');
const searchInput = document.querySelector('.search-input');
const tbody = document.querySelector('.table-scroll tbody');

// DATA DE LA PLANETE SELECTIONNEE
const planetName = document.querySelector('.planet-name');
const planetPopulation = document.querySelector('.planet-population');
const planetDiameter = document.querySelector('.planet-diameter');
const planetClimate = document.querySelector('.planet-climat');
const planetGravity = document.querySelector('.planet-gravity')
const planetTerrain = document.querySelector('.planet-terrain');

// RESULTAT TOTAL DES PLANETES
const resultCount = document.querySelector('.result');
let planetsData = [];

// RECUPERATION DES DATA
async function fetchPlanets() {

    const url = 'https://swapi.dev/api/planets/';
    try {
        let nextUrl = url;

        while (nextUrl) {
            const res = await fetch(nextUrl);
            const data = await res.json();

            planetsData = planetsData.concat(data.results);
            nextUrl = data.next;
        }

        plaSelect(planetsData);
        plaTable(planetsData);
        plaResultCount(planetsData.length);

    } catch (error) {
        console.error('Erreur, L\'étoile noire a déjà tout détruit ici', error);
    }
}

// AFFICHAGE DE LA LISTE DE TOUTES LES PLANETES RECUPEREES DANS LE SELECT
function plaSelect(planets) {

    planets.forEach(planet => {

        const option = document.createElement('option');
        option.value = planet.name;
        option.textContent = planet.name;
        planetSelect.appendChild(option);

    });

    // AJOUT D'UN ECOUTEUR SUR LE SELECT AFIN D'AFFICHER DYNAMIQUEMENT LA PLANETE DANS LE TABLEAU
    planetSelect.addEventListener('change', () => {

        const selectedPlanetName = planetSelect.value;
        const selectedPlanet = planets.find(planet => planet.name === selectedPlanetName);
        
        if (selectedPlanet) {
            plaTable([selectedPlanet]);
        }

    });
}

// MISE EN PLACE DE LA FONCTION RECHERCHE ET DU FILTRE
searchInput.addEventListener('input', function() {

    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredPlanets = planetsData.filter(planet => {
        return planet.name.toLowerCase().includes(searchTerm);
    });

    plaTable(filteredPlanets);
    plaResultCount(filteredPlanets.length);

});

// AFFICHAGE DE LA LISTE DE TOUTES LES PLANETES RECUPEREES DANS LE TABLEAU
function plaTable(planets) {

    tbody.textContent = '';

    planets.forEach(planet => {

        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = planet.name;
        row.appendChild(nameCell);

        const terrainCell = document.createElement('td');
        terrainCell.textContent = planet.terrain;
        row.appendChild(terrainCell);

        tbody.appendChild(row);

        row.addEventListener('click', () => {
            displayPlanetDetails(planet);
        });

    });
}

// AFFICHAGE DU NOMBRE DE PLANETES TOTALE
function plaResultCount(count) {

    resultCount.textContent = count;

}

// AFFICHAGE DES DATA DE LA PLANETE SELECTIONNEE
function displayPlanetDetails(planet) {

    console.log(planet)
    planetName.textContent = planet.name;
    planetPopulation.textContent = planet.population;
    planetDiameter.textContent = planet.diameter;
    planetClimate.textContent = planet.climate;
    planetGravity.textContent = planet.gravity;
    planetTerrain.textContent = planet.terrain;

}

// APPEL DE LA FUNCTION AFIN D'AFFICHER LES DATA AU CHARGEMENT DE LA PAGE
fetchPlanets();