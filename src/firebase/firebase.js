import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';

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
const tbodyReport = document.querySelector('#tBodyReport');
const btnAdd = document.querySelector('#btnAdd');

const btnReport = document.querySelector('.report-btn');
const tableBase = document.querySelector('.table-base');
const tReport = document.querySelector('.table-report');
const btnBackTo = document.querySelector('.back-to-btn');

btnAdd.addEventListener('click', async () => {
  let dateReverse = inputDate.value.split('-').reverse().join('-');
  let inputNameValue = inputName.value;
  let inputCountValue = inputCount.value;
  let inputUnitValue = inputUnit.value;
  let inputDateValue = dateReverse;
  let inputPriceValue = inputPrice.value;
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

      createNewItemRow(itemValue, itemID);
    }

    // console.log(itemsArr);
    
    let productNameReport = itemsArr[0][1][5];
    let productCountNameReport = itemsArr.length;
    let productDateReport = `02-02-2024 - 02-03-2024`;

    let productArrPriceReport = [];
    for (let j = 0; j < itemsArr.length; j++) {
      productArrPriceReport.push(Number(itemsArr[j][1][4]));
    }

    let sumArr = productArrPriceReport.reduce(function(a, b) {
      return a + b
    });

    // console.log(sumArr);

    // console.log(productNameReport, productCountNameReport, productDateReport, sumArr);

    function generateReport() {
      btnReport.addEventListener('click', (e) => {
        e.preventDefault();
    
        btnAdd.setAttribute('disabled', '');
        tableBase.classList.add('display-none');
    
        tReport.classList.remove('display-none');
        crateNewItemRowReport(productNameReport, productCountNameReport, productDateReport, sumArr);
      })
    }

    generateReport()
    
  } else {
    tBody.innerHTML = 'No Elements';
  }
})

function clearTable() {
  tBody.innerHTML = '';
}

function createNewItemRow(item, id) {
  let tr = tBody.insertRow();

  for (let i = 0; i < item.length; i++) {
    tr.insertCell().textContent += item[i];
  }

  tr.addEventListener('dblclick', () => {
    let removeElement = ref(db, `expense/${id}`);
    remove(removeElement);
  })
}

function crateNewItemRowReport(item, item2, item3, item4) {
  let tr = tbodyReport.insertRow();

  tr.insertCell().textContent = item;
  tr.insertCell().textContent = item2;
  tr.insertCell().textContent = item3;
  tr.insertCell().textContent = item4;
}

btnBackTo.addEventListener('click', () => {
  window.location.reload();
})