let peopleData = [];

// RECUPERATION DES DATA
async function fetchPeople() {
    const url = 'https://swapi.dev/api/people/';

    try {
        let nextUrl = url;
        while (nextUrl) {
            const data = await fetchData(nextUrl);
            peopleData = peopleData.concat(data.results);
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
    filterSearch();
    updateTable(peopleData);
    updateResultCount(peopleData.length);

}

// MISE EN PLACE DU FILTER PAR GENRE
function filterSelect() {

    const genderOptions = [
        { label: 'Filtrer par genre', value: '' },
        { label: 'Homme', value: 'male' },
        { label: 'Femme', value: 'female' },
        { label: 'Droïde', value: 'n/a' }
    ];

    genderOptions.forEach(option => {
        const selectOption = createOption(option.value, option.label);
        peopleSelect.appendChild(selectOption);
    });

    peopleSelect.addEventListener('change', selectChange);

}

// VERIFICATION DU CHANGEMENT SELECT ET MISE A JOUR DU TABLEAU + RESULTAT TOTAL
function selectChange() {
    const selectedOption = peopleSelect.value;
    let filteredPeople = [];

    try {
        filteredPeople = peopleData.filter(person => person.gender === selectedOption);
    } catch (e) {
        filteredPeople = peopleData;
    }

    updateTable(filteredPeople);
    updateResultCount(filteredPeople.length);
    
}

// MISE EN PLACE DE LA FONCTION RECHERCHE
function filterSearch() {

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filteredPeople = peopleData.filter(person => {
            return person.name.toLowerCase().includes(searchTerm);
        });

        updateTable(filteredPeople);
        updateResultCount(filteredPeople.length);

    });
}

// MISE EN PLACE DU RAFRAICHISSEMENT DU TABLEAU
function updateTable(people) {

    clearTableBody(tbody);

    people.forEach(person => {
        const row = createTableRow([person.name, person.height]);
        tbody.appendChild(row);

        row.addEventListener('click', () => {
            displayPersonDetails(person);
        });
    });
}

// MISE EN PLACE DU RAFRAICHISSEMENT DU RESULTAT TOTAL
function updateResultCount(count) {
    updateTextContent('.result', count);
}

// AFFICHAGE DES DATA DU PERSONNAGE
function displayPersonDetails(person) {

    console.log(person)
    updateTextContent('.people-name', person.name);
    updateTextContent('.people-gender', capitalizeFirstLetter(person.gender));
    updateTextContent('.people-height', person.height);
    updateTextContent('.people-mass', person.mass);
    updateTextContent('.people-hair-color', capitalizeFirstLetter(person.hair_color));
    updateTextContent('.people-eye-color', capitalizeFirstLetter(person.eye_color));

}

fetchPeople();