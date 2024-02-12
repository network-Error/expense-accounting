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
  window.localStorage.clear();
  window.localStorage.setItem('login', 'true');
})

exitBtn.addEventListener('click', () => {
  login.classList.remove('display-none');
  main.classList.add('display-none');
  loginEmail.value = '';
  loginPassword.value = '';
  window.localStorage.setItem('login', 'false');
})

if (window.localStorage.getItem('login') === 'false') {
  login.classList.remove('display-none');
  main.classList.add('display-none');
  loginEmail.value = '';
  loginPassword.value = '';
} else {
  login.classList.add('display-none');
  main.classList.remove('display-none');
}

// window.addEventListener('dblclick', (e) => {
//   if (e.target.closest('#tBody')) {
//     const changeInput = `<input type="text" placeholder="enter text">`;
//     e.target.innerHTML = changeInput;
//   } else {
//     console.log(e.target)
//   }
// })

const tableWrapper = document.querySelector('.table');
// tableWrapper.addEventListener('click', (e) => {

//   console.log(e.target.textContent)
//   // let newInput = `<input id="in-wrapp" type="text" class="form-control" value="${e.target.textContent}"><button id="btn-wrapp" class="btn btn-outline-secondary" type="button">+</button>`;
//   let newInput = `<input id="in-wrapp" type="text" value="${e.target.textContent}"><button id="btn-wrapp" type="button">+</button>`;
//   e.target.innerHTML = newInput;
//   let btnAddText = document.getElementById('btn-wrapp');

//   btnAddText.addEventListener('click', (e) => {
//     e.preventDefault;
//     console.log(e);
//   })
// })


tableWrapper.addEventListener('dblclick', (e) => {
  // console.log(e.target.textContent)
  const input = document.createElement('input');
  input.value = e.target.textContent;

  while (e.target.firstChild) {
    e.target.removeChild(e.target.firstChild)
  }

  e.target.appendChild(input)
  input.focus();

  input.addEventListener('blur', () => {
    e.target.removeChild(input);
    console.log(input.value);
  })
  console.log(input.value)
})