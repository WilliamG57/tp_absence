const checkboxJours = document.querySelector('input[name="jours"]');
const checkboxHeures = document.querySelector('input[name="heure"]');
const divDate = document.querySelector('.view_date');
const divHeure = document.querySelector('.view_heure');

function divVisible() {
    if (checkboxJours.checked) {
        divDate.style.display = '';
        divHeure.style.display = 'none';
    } else if (checkboxHeures.checked) {
        divHeure.style.display = '';
        divDate.style.display = 'none';
    } else {
        divDate.style.display = '';
        divHeure.style.display = '';
    }
}

checkboxJours.addEventListener('change', divVisible);
checkboxHeures.addEventListener('change', divVisible);

divVisible();

const jsonFile = "data.json";

function loadJson() {
    fetch(jsonFile)
        .then((response) => response.json())
        .then((data) => {
            document.querySelector('#motif_absence').innerHTML = jsonToHtml(data);
        })
}

function jsonToHtml(jsonData) {
    let html = '';
    const sortedKeys = Object.keys(jsonData).sort((a, b) => {
        // Tri numérique si les clés sont numériques, sinon tri alphabétique
        return isNaN(a) || isNaN(b) ? a.localeCompare(b) : a - b;
    });
    sortedKeys.forEach(code => {
        html += `<h3>Code ${code}: ${jsonData[code].description}</h3>`;
        if (Array.isArray(jsonData[code].details)) {
            jsonData[code].details.forEach(details => {
                html += `<label  class="radio_details"><input type="radio" name="details"/>${details}</label> <br>`;
            });
        }
        console.log(jsonData);
    })
    return html;
}
loadJson();
