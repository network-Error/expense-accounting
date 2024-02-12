import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCT-pBgCEQnJti8vb10YMxnU9yvtNB2m9g",
  authDomain: "expense-accounting-fireb-2b838.firebaseapp.com",
  projectId: "expense-accounting-fireb-2b838",
  storageBucket: "expense-accounting-fireb-2b838.appspot.com",
  messagingSenderId: "509972711459",
  appId: "1:509972711459:web:ca4ff3fcac58effd110996"
};

const appSettings = {
  databaseURL: 'https://expense-accounting-fireb-2b838-default-rtdb.europe-west1.firebasedatabase.app/'
};

const app = initializeApp(appSettings);
const db = getDatabase(app);
const expenseDB = ref(db, 'expense/');

const inputName = document.querySelector('#inputName');
const inputCount = document.querySelector('#inputCount');
const inputUnit = document.querySelector('#inputUnit');
const inputDate = document.querySelector('#inputDate');
const inputPrice = document.querySelector('#inputPrice');
const inputCategory = document.querySelector('#inputCategory');
const tBody = document.querySelector('tbody');
const btnAdd = document.querySelector('#btnAdd');

btnAdd.addEventListener('click', async () => {
  let dateRev = inputDate.value.split('-').reverse().join('-');
  let inputNameValue = inputName.value;
  let inputCountValue = inputCount.value;
  let inputUnitValue = inputUnit.value;
  // let inputDateValue = inputDate.value;
  let inputDateValue = dateRev;
  let inputPriceValue = inputPrice.value
  let inputCategoryValue = inputCategory.value;

  let inputArray = await [inputNameValue, inputCountValue, inputUnitValue, inputDateValue, inputPriceValue, inputCategoryValue];

  push(expenseDB, inputArray);

  clearInputField(inputNameValue, inputCountValue, inputUnitValue, inputDateValue, inputPriceValue, inputCategoryValue);
})

function clearInputField(inputName, inputCount, inputUnit, inputDate, inputPrice, inputCategory) {
  inputName.value = '';
  inputCount.value = '';
  inputUnit.value = '';
  inputDate.value = '';
  inputPrice.value = '';
  inputCategory.value = '';
}

onValue(expenseDB, (snapshot) => {

  if (snapshot.exists()) {
    let itemsArr = Object.entries(snapshot.val());

    clearTable();

    for (let i = 0; i < itemsArr.length; i++) {
      let item = itemsArr[i];
      let itemID = item[0];
      let itemValue = item[1];

      createNewItemRow(itemValue);
    }
  } else {
    tBody.innerHTML = 'No Elements';
  }
})

function clearTable() {
  tBody.innerHTML = '';
}

function createNewItemRow(item) {
  let tr = tBody.insertRow();

  for (let i = 0; i < item.length; i++) {
    tr.insertCell().textContent += item[i];
  }
}