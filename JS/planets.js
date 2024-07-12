let planetsData = [];

// RECUPERATION DES DATA
async function fetchPlanets() {
    const url = 'https://swapi.dev/api/planets/';

    try {
        let nextUrl = url;
        while (nextUrl) {
            const data = await fetchData(nextUrl);
            planetsData = planetsData.concat(data.results);
            nextUrl = data.next;
        }

        displayUI();

    } catch (error) {
        console.error('Erreur, L\'étoile noire a déjà tout détruit ici', error);
    }
}

// AFFICHAGE DE L'INTERFACE
function displayUI() {
    filterSelect();
    updateTable(planetsData);
    updateResultCount(planetsData.length);
    filterSearch();
}

// MISE EN PLACE DU FILTER
function filterSelect() {
    const populationOptions = [
        { label: 'Filtrer par population', min: -1, max: -1 },
        { label: '0 à 100 000', min: 0, max: 100000 },
        { label: '100 000 à 100 000 000', min: 100000, max: 100000000 },
        { label: '+100 000 000', min: 100000000, max: Infinity }
    ];

    populationOptions.forEach(selectOption => {
        const option = createOption(JSON.stringify(selectOption), selectOption.label);
        planetSelect.appendChild(option);
    });

    planetSelect.addEventListener('change', selectChange);
}

// VERFICATION DU CHANGEMENT SELECT ET MISE A JOUR DU TABLEAU + RESULTAT TOTAL
function selectChange() {
    const selectedOption = planetSelect.value;
    let filteredPlanets = [];

    try {
        const selectedRange = JSON.parse(selectedOption);
        filteredPlanets = planetsData.filter(planet => {
            const population = parseInt(planet.population);
            return !isNaN(population) && population >= selectedRange.min && population <= selectedRange.max;
        });
    } catch (e) {
        filteredPlanets = planetsData;
    }

    updateTable(filteredPlanets);
    updateResultCount(filteredPlanets.length);
    
}

// MISE EN PLACE DE LA FONCTION RECHERCHE
function filterSearch() {
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filteredPlanets = planetsData.filter(planet => {
            return planet.name.toLowerCase().includes(searchTerm);
        });

        updateTable(filteredPlanets);
        updateResultCount(filteredPlanets.length);
    });
}

// MISE EN PLACE DU RAFRAICHISSEMENT DU TABLEAU
function updateTable(planets) {
    clearTableBody(tbody);

    planets.forEach(planet => {
        const row = createTableRow([planet.name, capitalizeFirstLetter(planet.terrain)]);
        tbody.appendChild(row);

        row.addEventListener('click', () => {
            displayPlanetDetails(planet);
        });
    });
}

// MISE EN PLACE DU RAFRAICHISSEMENT DU RESULTAT TOTAL
function updateResultCount(count) {
    updateTextContent('.result', count);
}

// AFFICHAGE DES DATA DE LA PLANET
function displayPlanetDetails(planet) {

    console.log(planet);
    updateTextContent('.planet-name', planet.name);
    updateTextContent('.planet-population', planet.population);
    updateTextContent('.planet-diameter', planet.diameter);
    updateTextContent('.planet-climat', capitalizeFirstLetter(planet.climate));
    updateTextContent('.planet-gravity', planet.gravity);
    updateTextContent('.planet-terrain', capitalizeFirstLetter(planet.terrain));

}

fetchPlanets();