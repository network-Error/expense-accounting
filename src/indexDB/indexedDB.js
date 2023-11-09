export const connect = () => {
  const openDB = indexedDB.open('expenseDB', 3);
  let db;
  const form = document.querySelector('#enterData');
  const inputName = document.querySelector('#inputName');
  const inputCount = document.querySelector('#inputCount');
  const inputUnit = document.querySelector('#inputUnit');
  const inputDate = document.querySelector('#inputDate');
  const inputPrice = document.querySelector('#inputPrice');
  const inputCategory = document.querySelector('#inputCategory');
  const btnAdd = document.querySelector('#btnAdd');
  const tBody = document.querySelector('tbody');

  const dataSet = []

  function showData() {
    const transaction = db.transaction(['expenseStore'], 'readonly');
    const objectStore = transaction.objectStore('expenseStore');
    const cursor = objectStore.openCursor();

    function convertDate(date) {
      return date.split('-').reverse().join('-');
    }

    cursor.onsuccess = function (e) {
      const res = e.target.result;
      if (res) {
        let tr = tBody.insertRow();
        tr.insertCell().textContent = res.value.name;
        tr.insertCell().textContent = res.value.count;
        tr.insertCell().textContent = res.value.unit;
        // tr.insertCell().textContent = res.value.date;
        tr.insertCell().textContent = convertDate(res.value.date);
        tr.insertCell().textContent = res.value.price;
        tr.insertCell().textContent = res.value.category;
        res.continue();
      }
    }
  }

  openDB.onerror = function (err) {
    console.log(err);
  }

  openDB.onsuccess = function (e) {
    db = e.target.result;
    db.onerror = function (e) {
      console.log(`Database error: ${e.target.errorCode}`);
    }
    showData();
  }

  openDB.onupgradeneeded = function (e) {
    const db = e.target.result;
    const objectStore = db.createObjectStore('expenseStore', { keyPath: 'id', autoIncrement: true });

    objectStore.createIndex('nameIndex', 'name', { unique: false });
    objectStore.createIndex('countIndex', 'count', { unique: false });
    objectStore.createIndex('unitIndex', 'unit', { unique: false });
    objectStore.createIndex('dateIndex', 'date', { unique: false });
    objectStore.createIndex('priceIndex', 'price', { unique: false });
    objectStore.createIndex('categoryIndex', 'category', { unique: false });

    for (let i in dataSet) {
      objectStore.add(dataSet[i]);
    }
  }

  function clearInput() {
    inputName.value = '';
    inputCount.value = '';
    inputUnit.value = '';
    inputDate.value = '';
    inputPrice.value = '';
    inputCategory.value = '';
  }
  
  // Add items to DB
  btnAdd.addEventListener('click', (e) => {
    e.preventDefault();
    const transaction = db.transaction(['expenseStore'], 'readwrite');
    transaction.oncomplete = function (e) {
      console.log('Ok!');
    }
    transaction.onerror = function (e) {
      console.log('Transaction error');
    }

    const objectStore = transaction.objectStore('expenseStore');
    const data = {
      name: inputName.value,
      count: inputCount.value,
      unit: inputUnit.value,
      date: inputDate.value,
      price: inputPrice.value,
      category: inputCategory.value,
    }
    objectStore.add(data);
    tBody.innerHTML = '';
    showData();
    clearInput();
  })
}