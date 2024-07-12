async function displayData(url, selector) {
    const data = await fetchData(url);
    const count = data.count;
    updateTextContent(selector, count);
    console.log(data);
}

document.addEventListener('DOMContentLoaded', () => {
    displayData('https://swapi.dev/api/people', '.people');
    displayData('https://swapi.dev/api/vehicles', '.vehicules');
    displayData('https://swapi.dev/api/planets', '.planets');
});