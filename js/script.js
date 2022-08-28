"use strict";

const recipesContainerEl = document.getElementById("recipes-container");
const foodSearchBtnEl = document.getElementById("search-food");
const foodSearchInputField = document.getElementById("search-input-field");
const modalDetails = document.getElementById("modal-details");

const loadMeals = function () {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
    .then((res) => res.json())
    .then((data) => renderMeals(data.meals));
};

loadMeals();

foodSearchBtnEl.addEventListener("click", function () {
  const foodName = foodSearchInputField.value;

  foodSearchInputField.value = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
    .then((res) => res.json())
    .then((data) => {
      renderMeals(data.meals);
    });
});

const showRecepieDetails = function (mealId) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => renderDetailModal(data.meals[0]));
};

const renderMeals = function (meals) {
  recipesContainerEl.innerHTML = "";
  meals.forEach((meal) => {
    console.log(meal);
    const mealEl = document.createElement("article");
    mealEl.classList.add("col");
    mealEl.innerHTML = `
    <div class="card">
      <img src=${meal.strMealThumb} class="card-img-top" alt="..." />
      <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="text-success">Food Category: ${meal.strCategory}</p>
          <p class="text-success">Food Area: ${meal.strArea}</p>
          <p class="card-text">
            ${meal.strInstructions.slice(0, 160)}... 
          </p>
          <button onclick="showRecepieDetails(${meal.idMeal})"
          class="btn btn-success" 
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal">
          Show more
          </button>
      </div>
    </div>
    `;
    recipesContainerEl.appendChild(mealEl);
  });
};

const renderDetailModal = function (meal) {
  modalDetails.innerHTML = "";
  const modalContentEl = document.createElement("div");
  modalContentEl.classList.add("modal-content");
  modalContentEl.innerHTML = `
  <div class="modal-header border border-0 f-flex flex-column">
    <div><img src=${meal.strMealThumb} class="img-fluid" alt="" /></div>
    <h3 class="text-center">${meal.strMeal}</h3>
  </div>
  <div  class="p-5">
    <p>${meal.strInstructions}</p>
    <a href=${meal.strYoutube} target="_blank">See on Youtube</a>
  </div>
  <div class="modal-footer">
    <button
      type="button"
      class="btn btn-secondary"
      data-bs-dismiss="modal"
    >
      Close
    </button>
  </div> 
  `;
  modalDetails.appendChild(modalContentEl);
};
