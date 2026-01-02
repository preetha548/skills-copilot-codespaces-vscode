const medicationForm = document.getElementById('medication-form');
medicationForm.addEventListener('submit', addMedication);

function addMedication(e) {
    e.preventDefault();
    const medicationName = document.getElementById('medication-name').value;
    const medicationDosage = document.getElementById('medication-dosage').value;
    const medicationList = document.getElementById('medication-list');
    const li = document.createElement('li');
    li.innerText = `${medicationName} - ${medicationDosage}`;
    medicationList.appendChild(li);
    medicationForm.reset();
}

const reminderForm = document.getElementById('reminder-form');
reminderForm.addEventListener('submit', addReminder);

function addReminder(e) {
    e.preventDefault();
    const reminderName = document.getElementById('reminder-name').value;
    const reminderTime = document.getElementById('reminder-time').value;
    const reminderList = document.getElementById('reminder-list');
    const li = document.createElement('li');
    li.innerText = `${reminderName} - ${reminderTime}`;
    reminderList.appendChild(li);
    reminderForm.reset();
}