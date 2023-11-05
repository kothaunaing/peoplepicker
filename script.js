const nameInputElement = document.querySelector('.name-input');
const displayPeopleElement = document.querySelector('.display-people');
const addedPeopleElement = document.querySelector('.added-people');
const numberPeopleInputElement = document.querySelector('.people-number-input');
const selectedPeopleElement = document.querySelector('.selected-people');
const chosenPeopleElement = document.querySelector('.chosen-message');

let addedPeople = JSON.parse(localStorage.getItem('added-people')) || [];
let chosenPeople = JSON.parse(localStorage.getItem('chosen-people')) || [];

displayAddedPeople();
displayChosenPeople();
setToZero();

function addPeople() {
  const addedPerson = nameInputElement.value;

  if (addedPerson) {
    addedPeople.push(addedPerson);
  }

  displayAddedPeople();
  nameInputElement.value = '';
  saveToLocal();
}

function displayAddedPeople() {
  let addedPeopleDisplay = '';

  for (let i = 0; i < addedPeople.length; i++) {
    const name = addedPeople[i];

    addedPeopleDisplay += `
       <div class="added-person-container">
          <div class="added-person">
            <div class="number">${i + 1}.</div>
            <div class="name">${name}</div>
          </div>
          <button class="delete-btn" onclick="
          addedPeople.splice(${i}, 1);
          displayAddedPeople();
          saveToLocal();
          ">Remove</button>
        </div>
        `;
  }
  displayPeopleElement.innerHTML = `${addedPeople.length} `;
  if (addedPeople.length !== 0) {
    addedPeopleElement.innerHTML = `
    <div class="clear-btn-container">
      <button class="clear-btn" onclick="
        clearAddedPeople();
        ">
          Remove All
      </button>
    </div>
  ${addedPeopleDisplay}
  `;
  }
  else {
    addedPeopleElement.innerHTML = `
    <p class="added-people-message">Added names will be shown here.</p>
  `;
  }
}

function chooseButton() {
  chooseRandomPeople();
  displayChosenPeople();
  saveToLocal();
  setToZero();
  errorMessage();
  errorExceedPeople();
}

function chooseRandomPeople() {
  let numberPeople = Number(numberPeopleInputElement.value);

  if (isNaN(numberPeople) || numberPeople === 0) {
    numberPeople = 1;
    numberPeopleInputElement.value = '1';
  }

  const copyAddedPeople = addedPeople.slice();

  if (numberPeople <= addedPeople.length) {
    for (let i = 0; i < numberPeople; i++) {
      let index = Math.floor(Math.random() * copyAddedPeople.length);

      chosenPeople.push(copyAddedPeople[index]);
      copyAddedPeople.splice(index, 1);
    }
  }
}

function displayChosenPeople() {
  let chosenPeopleDisplay = '';
  let people = 'people are';

  if (chosenPeople.length <= 1) {
    people = 'person is';
  }

  for (let i = 0; i < chosenPeople.length; i++) {
    let name = chosenPeople[i];

    chosenPeopleDisplay += `
    <div class="selected-person">
    <div class="number">${i + 1}.</div>
    <div class="name">${name}</div>
   </div>
    `;
  }
  if (chosenPeople.length !== 0) {
    selectedPeopleElement.innerHTML = `
    <p class="chosen-message">${chosenPeople.length} ${people} picked randomly.</p>
    ${chosenPeopleDisplay}
    `;
  }
  else {
    selectedPeopleElement.innerHTML = `
    <p class="chosen-people-message">
      Randomly picked names will be shown here.
    </p>
    `;
  }
}


function setToZero() {
  chosenPeople = [];
}

function saveToLocal() {
  const chosenPeopleString = JSON.stringify(chosenPeople);
  const addedPeopleString = JSON.stringify(addedPeople);
  localStorage.setItem('added-people', addedPeopleString);
  localStorage.setItem('chosen-people', chosenPeopleString);
}

function addWithEnter(event) {
  if (event.key === 'Enter') {
    addPeople();
  }
}

function clearAddedPeople() {
  localStorage.removeItem('added-people');
  localStorage.removeItem('chosen-people');
  addedPeople = [];
  chosenPeople = [];
  displayAddedPeople();
  displayChosenPeople();
  nameInputElement.value = '';
}

function errorMessage() {
  if (addedPeople.length === 0) {
    selectedPeopleElement.innerHTML = `
    <p class="chosen-people-message">
      Add names first. Then pick again !
    </p>
    `;
  }
}

function errorExceedPeople(){
  const peopleNumber = numberPeopleInputElement.value;
  const totalPeopleNumber = addedPeople.length;
  let people = `are only ${totalPeopleNumber} people`;

  if (totalPeopleNumber === 1){
    people = `is only one person`;
  }

  if (totalPeopleNumber === 0){
    people = `is nothing`;
  }
  
  if (peopleNumber > totalPeopleNumber){
    selectedPeopleElement.innerHTML = `
    <p class="chosen-people-message">
    There  ${people} in the list !
    </p> `;
  }

  if (totalPeopleNumber === 0){

  }

}