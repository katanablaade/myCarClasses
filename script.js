'use strict';

const btnSave = document.querySelector('.btn-save');
const selectBrand = document.querySelector('#brand-select');
const selectBodyType = document.querySelector('#body-type-select');
const optionBmw = document.querySelector('option[value = "BMW"]');
const optionLexus = document.querySelector('option[value = "Lexus"]');

const selectMarkSpan = document.querySelector('.span-model');
const selectEngine = document.querySelector('#engine-select');
const selectTransmission = document.querySelector('#transmission-select');
const inputYear = document.querySelector('.input-year');
const inputColor = document.querySelector('.input-color');
const tdFromInput = document.querySelectorAll('.td-from-input');

const setData = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];

let arr = getData('myCar');

class Car {
  constructor({ brand, model, year, color }) {
    this._brand = brand;
    this._model = model;
    this._year = year;
    this._color = color;
  }

  get brand() {
    return this._brand;
  }

  set brand(str) {
    this._brand = str;
  }

  get model() {
    return this._model;
  }

  set model(str) {
    this._model = str;
  }

  get year() {
    return this._year;
  }

  set year(number) {
    this._year = number;
  }

  get color() {
    return this._color;
  }

  set color(str) {
    this._color = str;
  }
}

class Bmw extends Car {
  constructor({ brand, model, year, color, transmission, engine }) {
    super({ brand, model, year, color });
    this.transmission = transmission;
    this.engine = engine;
  }
}

class Lexus extends Car {
  constructor({ brand, model, year, color, transmission, engine }) {
    super({ brand, model, year, color });
    this.transmission = transmission;
    this.engine = engine;
  }
}

class Table {
  change() {
    const brand = selectBrand.value;
    const model = selectBodyType.value;
    const year = parseInt(inputYear.value);
    const color = inputColor.value;
    let newCar;

    if (optionLexus.selected) {
      const engine = selectEngine.value;
      const transmission = selectTransmission.value;

      newCar = new Lexus({ brand, model, engine, transmission, year, color });
    } else if (optionBmw.selected) {
      const engine = selectEngine.value;
      const transmission = selectTransmission.value;

      newCar = new Bmw({ brand, model, engine, transmission, year, color });
    }

    if (newCar) {
      arr.push(newCar);
      newTable.render();
    }
  }

  render() {
    const headerTable = document.querySelector('.header-table');
    const searchTr = document.querySelectorAll('.new-tr');

    searchTr.forEach((item) => {
      item.innerHTML = '';
    });

    arr.forEach((item, index) => {
      const tr = document.createElement('tr');
      tr.classList.add('new-tr');
      headerTable.after(tr);

      for (let key in item) {
        const newTr = document.querySelector('.new-tr');
        const td = document.createElement('td');
        newTr.append(td);
        td.textContent = item[key];
      }

      const tdSearch = document.querySelector('.new-tr');
      let tdBtnRemove = document.createElement('button');
      tdBtnRemove.style.border = 'none';

      tdBtnRemove.innerHTML = 'Удалить';
      tdBtnRemove.addEventListener('click', () => {
        newTable.remove(index);
        setData('myCar', arr);
      });
      tdSearch.append(tdBtnRemove);
    });
  }

  remove(index) {
    arr.splice(index, 1);
    setData('myCar', arr);
    newTable.render();
  }
}

const newTable = new Table();

btnSave.addEventListener('click', (event) => {
  event.preventDefault();
  newTable.change();
  setData('myCar', arr);
  newTable.render();
});

newTable.render();
