// Jai shree ram

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://realtime-database-1f3a7-default-rtdb.firebaseio.com/",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputvalue = inputFieldEl.value;
  if (inputvalue.length > 0)
    push(shoppingListInDB, inputvalue);
  //   appendItemToShoppingListEl(inputvalue);
  clearInputFieldEl();
  // console.log(inputvalue)
});
// clearshoppingListEl();
onValue(shoppingListInDB, function (snapshot) {

  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
    clearInputFieldEl();
    clearshoppingListEl();
    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemValue = currentItem[1];
      let currentItemID = currentItem[0];
      appendItemToShoppingListEl(currentItem);
    }
  }
  else {
    shoppingListEl.innerHTML = "No items ... yet";
  }

});
function clearInputFieldEl() {
  inputFieldEl.value = "";
}
function clearshoppingListEl() {
  shoppingListEl.textContent = "";
}

function appendItemToShoppingListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];
  // shoppingListEl.innerHTML += `<li> ${inputvalue} </li>`;
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;
  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationOfItemInDB)
  })
  shoppingListEl.append(newEl);
}
