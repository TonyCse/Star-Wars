// QuerySelector pour la page planets.html
const planetSelect = document.querySelector('.planet-select');
const searchInput = document.querySelector('.search-input');
const tbody = document.querySelector('.table-scroll tbody');

// QuerySelector pour la page vehicules.html
const vehicleSelect = document.querySelector('.vehicle-select');
const vehicleSearchInput = document.querySelector('.search-input');
const vehiclesTableBody = document.querySelector('tbody');

// QuerySelector pour la page people.html
const searchInputPeople = document.querySelector('.search-input');
const peopleTableBody = document.querySelector('tbody');
const peopleSelect = document.querySelector('.peoples-select');

function updateTextContent(selector, text) {
    const element = document.querySelector(selector);
    element.textContent = text;
}

function createOption(value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    return option;
}

function createTableRow(cells) {
    const row = document.createElement('tr');
    cells.forEach(cellText => {
        const cell = document.createElement('td');
        cell.textContent = cellText;
        row.appendChild(cell);
    });
    return row;
}

function clearTableBody(tbody) {
    tbody.textContent = '';
}