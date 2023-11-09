import './styles/style.scss';
import * as bootstrap from 'bootstrap';
import { connect } from './indexDB/indexedDB.js';

const inputName = document.querySelector('#inputName');
const inputCount = document.querySelector('#inputCount');
const inputUnit = document.querySelector('#inputUnit');
const inputDate = document.querySelector('#inputDate');
const inputPrice = document.querySelector('#inputPrice');
const inputCategory = document.querySelector('#inputCategory');
const btnAdd = document.querySelector('#btnAdd');
const tBody = document.querySelector('tbody');
const main = document.querySelector('.main');
const login = document.querySelector('.login');
const btnADM = document.querySelector('.btn-adm');
const exitBtn = document.querySelector('.exit-btn');
const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');
const btnLogin = document.querySelector('.btn-login');

connect();

btnLogin.addEventListener('click', () => {
  let loginE = loginEmail.value;
  let passwordE = loginPassword.value;

  if (loginE === 'admin@admin.admin' && passwordE === 'admin') {
    login.classList.add('display-none');
    main.classList.remove('display-none');
    loginE = '';
    passwordE = '';
  } else {
    alert('LOGIN ERROR!');
  }
})

btnADM.addEventListener('click', () => {
  login.classList.add('display-none');
  main.classList.remove('display-none');
})

exitBtn.addEventListener('click', () => {
  login.classList.remove('display-none');
  main.classList.add('display-none');
  loginEmail.value = '';
  loginPassword.value = '';
})

// window.onload = function() {
//   insertDataToRow();
// }

// function getData() {
//   inputData.push({
//     name: `${inputName.value}`,
//     count: `${inputCount.value}`,
//     unit: `${inputUnit.value}`, 
//     date: `${inputDate.value}`, 
//     price: `${inputPrice.value}`, 
//     category: `${inputCategory.value}`
//   });
//   console.log(inputData);
// }

// function clearInput() {
//   inputName.value = '';
//   inputCount.value = '';
//   inputUnit.value = '';
//   inputDate.value = '';
//   inputPrice.value = '';
//   inputCategory.value = '';
// }

// function insertDataToRow() {
//   tBody.innerHTML = '';
//   for (let obj of inputData) {
//     let tr = tBody.insertRow();
//     tr.insertCell().textContent = obj.name;
//     tr.insertCell().textContent = obj.count;
//     tr.insertCell().textContent = obj.unit;
//     tr.insertCell().textContent = obj.date;
//     tr.insertCell().textContent = obj.price;
//     tr.insertCell().textContent = obj.category;
//   }
// }

// btnAdd.addEventListener('click', (e) => {
//   // e.preventDefault();
//   // getData();
//   // insertDataToRow();
//   // clearInput();
// });