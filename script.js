let addedPeople = JSON.parse(localStorage.getItem('added-people')) || [];
let pickedPeople = JSON.parse(localStorage.getItem('picked-people')) || [];;

displayAddedPeople(); // Display all people added in the list
displayPickedPeople();

document.querySelector('.add-btn') // When click add button the following code will work
  .addEventListener('click', () => {
    addToList();
    displayAddedPeople();
    saveToLocalStorage();
  });

document.querySelector('.name-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addToList();
    displayAddedPeople();
    saveToLocalStorage();
  }
})

document.querySelector('.choose-btn')
  .addEventListener('click', () => {
    pickPeople();

    setTimeout(() => {
      displayPickedPeople();
    }, 2000);

    document.querySelector('.selected-people').innerHTML = '<p class="picking">Picking randomly . . .</p>';
    setTimeout(() => {
      document.querySelector('.picking').remove() = '';
    }, 2000)

    saveToLocalStorage();
  });


document.querySelector('.people-number-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    pickPeople();
    displayPickedPeople();
    saveToLocalStorage();;
  }
})


function displayAddedPeople() { // Generate html content based on the added people array
  const addedPeopleElement = document.querySelector('.added-people');
  finalHTML = '';

  if (addedPeople.length !== 0) {
    addedPeople.forEach((name, index) => {
      finalHTML += `
      <div class="added-person-container">
      <div class="added-person">
        <div class="number">${index + 1}.</div>
        <div class="name">${name}</div>
      </div>
        <button class="delete-btn js-delete-btn" 
        data-name="${name}">
          Remove
        </button>
    </div>
      `;
    });

    addedPeopleElement.innerHTML = `
    <div class="clear-btn-container">
      <button class="clear-btn">
        Remove All
      </button>
      <div class="confirm-dialogue">
        <div>Remove all ? </div>
        <button class="yes-btn">Yes</button>
        <button class="no-btn">No</button>
      </div>
    </div>
    ${finalHTML}`;

    document.querySelectorAll('.js-delete-btn') // Codes for remove button
      .forEach((button, index) => {
        button.addEventListener('click', () => {
          addedPeople.splice(index, 1);
          displayAddedPeople();
          saveToLocalStorage();
        });
      });

    const confirmDialogueElement = document.querySelector('.confirm-dialogue');
    const removeAllButtonElement = document.querySelector('.clear-btn');

    removeAllButtonElement
      .addEventListener('click', () => {
        if (!removeAllButtonElement.classList.contains('clear-btn-active')) {
          removeAllButtonElement.classList.add('clear-btn-active');
          confirmDialogueElement.classList.add('confirm-dialogue-active');
        } else {
          removeAllButtonElement.classList.remove('clear-btn-active');
          confirmDialogueElement.classList.remove('confirm-dialogue-active');
        }
      });

    document.querySelector('.yes-btn')
      .addEventListener('click', () => {
        addedPeople = [];
        localStorage.removeItem('added-people');
        displayAddedPeople();
      });

    document.querySelector('.no-btn')
      .addEventListener('click', () => {
        removeAllButtonElement.classList.remove('clear-btn-active');
        confirmDialogueElement.classList.remove('confirm-dialogue-active');
      });

  } else {
    addedPeopleElement.innerHTML = finalHTML;
  }
  const displayPeopleElement = document.querySelector('.display-people');
  displayPeopleElement.innerHTML = addedPeople.length;
}

const messageElement = document.querySelector('.message');
function addToList() {

  nameInputElement = document.querySelector('.name-input');
  const name = nameInputElement.value;
  let matchingName = false;

  addedPeople.forEach((person) => {
    if (name.toLowerCase() === person.toLowerCase()) {
      matchingName = true;
    }
  });

  if (matchingName) {
    message();
    messageElement.innerHTML = 'This name is already in the list !';
  } else {
    if (name) {
      addedPeople.push(name);
    } else {
      message();
      messageElement.innerHTML = 'Name is empty !';
    }
  }
  displayAddedPeople();
  nameInputElement.value = '';
}

function pickPeople() {
  pickedPeople = [];
  const peopleNumberInputElement = document.querySelector('.people-number-input');
  const peopleNumber = Number(peopleNumberInputElement.value);
  let errormessage;

  const addedPeopleCopy = addedPeople.slice();

  if (peopleNumber <= addedPeople.length) {
    for (let i = 0; i < peopleNumber; i++) {
      let index = Math.floor(Math.random() * addedPeopleCopy.length);
      pickedPeople.push(addedPeopleCopy[index]);
      addedPeopleCopy.splice(index, 1);
    }
  } else {
    if (addedPeople.length === 0) {
      errormessage = `Add names first. Then pick again !`;
    }
    else if (addedPeople.length === 1) {
      errormessage = `There is only one person in the list !`;
    }
    else {
      errormessage = `There are only ${addedPeople.length} people in the list !`
    }
    message();
    messageElement.innerHTML = errormessage;
  }
  if (!peopleNumber) {
    message();
    messageElement.innerHTML = 'Enter number of people to pick !';
  }
}

function displayPickedPeople() {
  const selectedPeopleElement = document.querySelector('.selected-people');
  let finalHTML = '';

  pickedPeople.forEach((name, index) => {
    finalHTML += `
    <div class="selected-person">
      <div class="number">${index + 1}.</div>
      <div class="name">${name}</div>
   </div>
    `;
  });
  let message;

  if (pickedPeople.length === 1){
    message = 'person';
  }
  else {
    message = 'people';
  }

  if (pickedPeople.length !== 0) {
    selectedPeopleElement.innerHTML = `
  <p class="chosen-message">Picked ${pickedPeople.length} ${message} randomly.</p>
  ${finalHTML}
  `;
  }
}

function saveToLocalStorage() {
  const addedPeopleString = JSON.stringify(addedPeople);
  const pickedPeopleString = JSON.stringify(pickedPeople);

  localStorage.setItem('added-people', addedPeopleString);
  localStorage.setItem('picked-people', pickedPeopleString);
}

let timeOutId;

function message() {
  const messageElement = document.querySelector('.message-container');
  messageElement.classList.add('message-container-active');

  clearTimeout(timeOutId);
  timeOutId = setTimeout(() => {
    messageElement.classList.remove('message-container-active');
  }, 3000);
}