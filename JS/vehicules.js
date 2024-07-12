let vehiclesData = [];

// RECUPERATION DES DONNEES
async function fetchVehicles() {

    const url = 'https://swapi.dev/api/vehicles/';

    try {
        let nextUrl = url;
        while (nextUrl) {
            const data = await fetchData(nextUrl);
            vehiclesData = vehiclesData.concat(data.results);
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
    updateTable(vehiclesData);
    updateResultCount(vehiclesData.length);
    filterSearch();

}

// MISE EN PLACE DU FILTER
function filterSelect() {

    const costRanges = [
        { label: 'Filtrer par coût', min: -1, max: -1 },
        { label: '0 à 10 000', min: 0, max: 10000 },
        { label: '10 000 à 100 000', min: 10000, max: 100000 },
        { label: '+100 000', min: 100000, max: Infinity }
    ];

    costRanges.forEach(range => {
        const option = createOption(JSON.stringify(range), range.label);
        vehicleSelect.appendChild(option);
    });

    vehicleSelect.addEventListener('change', selectChange);

}

// VERIFICATION DU CHANGEMENT SELECT ET MISE A JOUR DU TABLEAU + RESULTAT TOTAL
function selectChange() {
    const selectedOption = vehicleSelect.value;
    let filteredVehicles = [];

    try {
        const selectedRange = JSON.parse(selectedOption);
        filteredVehicles = vehiclesData.filter(vehicle => {
            const cost = parseInt(vehicle.cost_in_credits);
            return !isNaN(cost) && cost >= selectedRange.min && cost <= selectedRange.max;
        });
    } catch (e) {
        filteredVehicles = vehiclesData;
    }

    updateTable(filteredVehicles);
    updateResultCount(filteredVehicles.length);
    
}

// MISE EN PLACE DE LA FONCTION RECHERCHE
function filterSearch() {

    vehicleSearchInput.addEventListener('input', function() {
        const searchTerm = vehicleSearchInput.value.trim().toLowerCase();
        const filteredVehicles = vehiclesData.filter(vehicle => {
            return vehicle.name.toLowerCase().includes(searchTerm);
        });

        updateTable(filteredVehicles);
        updateResultCount(filteredVehicles.length);

    });
}

// MISE EN PLACE DU RAFRAICHISSEMENT DU TABLEAU
function updateTable(vehicles) {

    clearTableBody(vehiclesTableBody);

    vehicles.forEach(vehicle => {
        const row = createTableRow([vehicle.name, capitalizeFirstLetter(vehicle.model), capitalizeFirstLetter(vehicle.vehicle_class)]);
        vehiclesTableBody.appendChild(row);

        row.addEventListener('click', () => {
            displayVehicleDetails(vehicle);
        });
    });
}

// MISE EN PLACE DU RAFRAICHISSEMENT DU RESULTAT TOTAL
function updateResultCount(count) {
    updateTextContent('.result', count);
}

// AFFICHAGE DES DONNEES DU VEHICULE
function displayVehicleDetails(vehicle) {

    console.log(vehicle)
    updateTextContent('.vehicle-name', vehicle.name);
    updateTextContent('.vehicle-passengers', vehicle.passengers);
    updateTextContent('.vehicle-cost', capitalizeFirstLetter(vehicle.cost_in_credits));
    updateTextContent('.vehicle-capacity', vehicle.cargo_capacity);
    updateTextContent('.vehicle-manufacturer', vehicle.manufacturer);

}

fetchVehicles();