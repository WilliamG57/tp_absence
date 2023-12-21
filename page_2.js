function getFormData() {
    const dataString = localStorage.getItem('formData');
    if (dataString) {
        return JSON.parse(dataString);
    }
    return null;
}

getFormData();
console.log(getFormData());

const lastName = document.querySelector('.abs_lastName');
const firstName = document.querySelector('.abs_firstName');
const formation = document.querySelector('.abs_formation');
const periode = document.querySelector('.abs_periode');
const motifAbs = document.querySelector('.abs_motif');

function valueAbsence() {
    lastName.textContent = `Nom : ${localStorage.getItem('lastName')}`;
    firstName.textContent = `Prénom : ${localStorage.getItem('firstName')}`;
    formation.textContent = `Qui suit la formation de : ${localStorage.getItem('formation')}`;
    motifAbs.textContent = `Pour le motif de : ${localStorage.getItem('motif')}`;
    if (localStorage.getItem('dateDebut')) {
        periode.textContent = `Sera absent du ${localStorage.getItem('dateDebut')} au ${localStorage.getItem('dateFin')} soit ${localStorage.getItem('joursAbsent')} jours.`;
    } else if (localStorage.getItem('heureDebut')) {
        periode.textContent = `Sera absent de ${localStorage.getItem('heureDebut')} jusqu'à ${localStorage.getItem('heureFin')}`;
    }
}
valueAbsence();
