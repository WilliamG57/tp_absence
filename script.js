const checkboxJours = document.querySelector('input[name="jours"]');
const checkboxHeures = document.querySelector('input[name="heure"]');
const divDate = document.querySelector('.view_date');
const divHeure = document.querySelector('.view_heure');

const regex = /^[A-Za-zéèêëîïôöûüàáâäæç-]+(?:\s[A-Za-zéèêëîïôöûüàáâäæç-]+)*$/;

//Choix de jours ou de heure
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

//Recuperation du json
function loadJson() {
    fetch(jsonFile)
        .then((response) => response.json())
        .then((data) => {
            document.querySelector('#motif_absence').innerHTML = jsonToHtml(data);
        })
}

//Mise en place du json dans le html
function jsonToHtml(jsonData) {
    let html = '';
    //tri des objet du json
    const sortedKeys = Object.keys(jsonData).sort((a, b) => {
        return isNaN(a) || isNaN(b) ? a.localeCompare(b) : a - b;
    });
    //Insertion des objets json
    sortedKeys.forEach(code => {
        html += `<h3>Code ${code}: ${jsonData[code].description}</h3>`;
        if (Array.isArray(jsonData[code].details)) {
            jsonData[code].details.forEach(details => {
                html += `<label  class="radio_details"><input type="radio" name="details" class="input_radio" value="${details}"/>${details}</label> <br>`;
            });
        }
        console.log(jsonData);
    })
    return html;
}

loadJson();


//Calcul des dates trop chiante, function faite avec GPT
function calculerJoursAbsence() {
    const dateDebut = document.querySelector('.date_1').value;
    const dateFin = document.querySelector('.date_2').value;
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);

    const aujourdHui = new Date();
    aujourdHui.setHours(0, 0, 0, 0);
    const hier = new Date(aujourdHui);
    hier.setDate(hier.getDate() - 1);

    if (debut < hier || fin < hier) {
        alert("Veuillez sélectionner une date qui n'est pas antérieure à aujourd'hui.");
        return;
    }

    const difference = fin - debut;
    const nombreDeJours = difference / (1000 * 3600 * 24);

    if (nombreDeJours >= 0 && !isNaN(nombreDeJours)) {
        document.getElementById('jours_absent').value = nombreDeJours;
    } else {
        alert("Veuillez entrer une plage de dates valide.");
        document.getElementById('jours_absent').value = '';
    }
}

document.querySelector('.date_1').addEventListener('change', calculerJoursAbsence);
document.querySelector('.date_2').addEventListener('change', calculerJoursAbsence);


function sendToNext() {
    let lastName = document.getElementById("nom").value;
    let firstName = document.getElementById("prenom").value;
    let formation = document.getElementById("formation").value;

    if (regex.test(lastName) && regex.test(firstName) && regex.test(formation)) {
        console.log("Nom prénom et formation valides.");
    } else {
        console.log("Nom ou prénom ou formation invalide.");
        return;
    }

    let dateDebut = document.querySelector('.date_1').value;
    let dateFin = document.querySelector('.date_2').value;
    let heureDebut = document.querySelector('.time_1').value
    let heureFin = document.querySelector('.time_2').value
    let motifElement = document.querySelector('input[name="details"]:checked');
    let motif = motifElement ? motifElement.value : null;

    localStorage.setItem('lastName', lastName);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('formation', formation);

    if (checkboxJours.checked) {
        localStorage.setItem('dateDebut', dateDebut);
        localStorage.setItem('dateFin', dateFin);
    } else if (checkboxHeures.checked) {
        localStorage.setItem('heureDebut', heureDebut)
        localStorage.setItem('heureFin', heureFin)
    }
    if (motif) {
        localStorage.setItem('motif', motif);
    }
    console.log(localStorage);
}

const bouton = document.getElementById("btn_send");
bouton.addEventListener("click", sendToNext)
sendToNext();
