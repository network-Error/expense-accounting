import './styles/style.scss';
import * as bootstrap from 'bootstrap';

const inputName = document.querySelector('#inputName');
const inputCount = document.querySelector('#inputCount');
const inputUnit = document.querySelector('#inputUnit');
const inputDate = document.querySelector('#inputDate');
const inputPrice = document.querySelector('#inputPrice');
const inputCategory = document.querySelector('#inputCategory');
const btnAdd = document.querySelector('#btnAdd');

const tBody = document.querySelector('tbody');

// const inputData = {
//   name: ['name', 'name2', 'name3'],
//   count: ['1', '2', '3'],
//   unit: ['штука', 'штука', 'штука'],
//   date: ['12.12.2023', '13.12.2023', '14.12.2023'],
//   price: ['12', '100', '22'],
//   category: ['продукты', 'продукты', 'продукты'],
// }
const inputData = [
  {name: 'name', count: '1', unit: 'штука', date: '12-12-2023', price: '12', category: 'продукты'},
  {name: 'name1', count: '2', unit: 'штука', date: '13-12-2023', price: '10', category: 'продукты'},
  {name: 'name2', count: '3', unit: 'штука', date: '14-12-2023', price: '22', category: 'продукты'},
]


window.onload = function() {
  insertDataToRow();
}

function getData() {
  // inputData.name.push(inputName.value);
  // inputData.count.push(inputCount.value);
  // inputData.unit.push(inputUnit.value);
  // inputData.date.push(inputDate.value);
  // inputData.price.push(inputPrice.value);
  // inputData.category.push(inputCategory.value);
  inputData.push({name: `${inputName.value}`, count: `${inputCount.value}`, unit: `${inputUnit.value}`, date: `${inputDate.value}`, price: `${inputPrice.value}`, category: `${inputCategory.value}`});
  console.log(inputData);
}

function clearInput() {
  inputName.value = '';
  inputCount.value = '';
  inputUnit.value = '';
  inputDate.value = '';
  inputPrice.value = '';
  inputCategory.value = '';
}

function insertDataToRow() {
  for (let obj of inputData) {
    let tr = tBody.insertRow();
    tr.insertCell().textContent = obj.name;
    tr.insertCell().textContent = obj.count;
    tr.insertCell().textContent = obj.unit;
    tr.insertCell().textContent = obj.date;
    tr.insertCell().textContent = obj.price;
    tr.insertCell().textContent = obj.category;
  }
}

btnAdd.addEventListener('click', (e) => {
  e.preventDefault();
  getData();
  insertDataToRow();
  clearInput();
});

// function addLayout() {
//   const createTr = document.createElement('tr');
  
//   tBody.insertAdjacentElement('beforeend', createTr);
//   createTr.classList.add('tr-class');

//   for(let i = 0; i < Object.keys(inputData).length; i++) {
//     const createTh = document.createElement('th');
//     createTr.appendChild(createTh);
//   }
  
//   return createTr;
// }
