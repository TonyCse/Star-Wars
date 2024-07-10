const vehicleSelect = document.querySelector('.vehicle-select');
const searchInput = document.querySelector('.search-input');
const tbody = document.querySelector('.table-scroll tbody');

// DATA DU VEHICULE SELECTIONNE
const vehicleName = document.querySelector('.vehicle-name');
const vehicleModel = document.querySelector('.vehicle-model');
const vehicleClass = document.querySelector('.vehicle-class');
const vehiclePassengers = document.querySelector('.vehicle-passengers');
const vehicleCost = document.querySelector('.vehicle-cost');
const vehicleCapacity = document.querySelector('.vehicle-capacity');
const vehicleManufacturer = document.querySelector('.vehicle-manufacturer');

// RESULTAT TOTAL DES VEHICULES
const resultCount = document.querySelector('.result');
let vehiclesData = [];

// RECUPERATION DES DONNEES
async function fetchVehicles() {
    
    const url = 'https://swapi.dev/api/vehicles/';
    try {
        let nextUrl = url;

        while (nextUrl) {
            const res = await fetch(nextUrl);
            const data = await res.json();

            vehiclesData = vehiclesData.concat(data.results);
            nextUrl = data.next;
        }

        vehiSelect(vehiclesData);
        vehiTable(vehiclesData);
        vehiResultCount(vehiclesData.length);

    } catch (error) {
        console.error('Erreur, aucun véhicule en orbite', error);
    }

}

// AFFICHAGE DE LA LISTE DE TOUS LES VEHICULES DANS LE SELECT
function vehiSelect(vehicles) {

    vehicles.forEach(vehicle => {
        const option = document.createElement('option');
        option.value = vehicle.name;
        option.textContent = vehicle.name;
        vehicleSelect.appendChild(option);

    });

    // AJOUT D'UN ECOUTEUR SUR LE SELECT POUR AFFICHER DYNAMIQUEMENT LE VEHICULE DANS LE TABLEAU
    vehicleSelect.addEventListener('change', () => {

        const selectedVehicleName = vehicleSelect.value;
        const selectedVehicle = vehicles.find(vehicle => vehicle.name === selectedVehicleName);
        
        if (selectedVehicle) {
            vehiTable([selectedVehicle]);
        }

    });
}

// MISE EN PLACE DE LA FONCTION RECHERCHE ET DU FILTRE
searchInput.addEventListener('input', function() {

    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredVehicles = vehiclesData.filter(vehicle => {
        return vehicle.name.toLowerCase().includes(searchTerm);
    });

    vehiTable(filteredVehicles);
    vehiResultCount(filteredVehicles.length);

});

// AFFICHAGE DE LA LISTE DE TOUS LES VEHICULES DANS LE TABLEAU
function vehiTable(vehicles) {

    tbody.textContent = '';

    vehicles.forEach(vehicle => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = vehicle.name;
        row.appendChild(nameCell);

        const modelCell = document.createElement('td');
        modelCell.textContent = vehicle.model;
        row.appendChild(modelCell);

        const classCell = document.createElement('td');
        classCell.textContent = vehicle.vehicle_class;
        row.appendChild(classCell);

        tbody.appendChild(row);

        row.addEventListener('click', () => {
            displayVehicleDetails(vehicle);
        });
    });

}

// AFFICHAGE DU NOMBRE TOTAL DE VEHICULES
function vehiResultCount(count) {

    resultCount.textContent = count;

}

// AFFICHAGE DES DONNEES DU VEHICULE SELECTIONNE
function displayVehicleDetails(vehicle) {

    console.log(vehicle);
    if (vehicleName) vehicleName.textContent = vehicle.name || '';
    if (vehicleModel) vehicleModel.textContent = vehicle.model || '';
    if (vehicleClass) vehicleClass.textContent = vehicle.vehicle_class || '';
    if (vehiclePassengers) vehiclePassengers.textContent = vehicle.passengers || '';
    if (vehicleCost) vehicleCost.textContent = vehicle.cost_in_credits || '';
    if (vehicleCapacity) vehicleCapacity.textContent = vehicle.cargo_capacity || '';
    if (vehicleManufacturer) vehicleManufacturer.textContent = vehicle.manufacturer || '';

}

// APPEL DE LA FONCTION POUR RECUPERER ET AFFICHER LES DONNEES AU CHARGEMENT DE LA PAGE
fetchVehicles();