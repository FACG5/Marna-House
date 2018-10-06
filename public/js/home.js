const fromField = document.querySelector('.middle--section__form__main--input--from');
const toField = document.querySelector('.middle--section__form__main--input--to');
const typeField = document.querySelector('.middle--section__form__main--dropbox');
const searchBtn = document.querySelector('.middle--section__form__main--submit');
const searchAlert = document.querySelector('.middle--section__form__main--alert');

console.log([fromField, toField, typeField, searchBtn, searchAlert]);
// searchBtn.addEventListener('click', (event) => {

//   if (vaildationOfSearch()) {
//     fetching('/available-rooms', collectData(), 'post');
//   }
// });

// function collectData() {
//   return {
//     from: fromField.value,
//     to: toField.value,
//     type: typeField.value,
//   };
// }

// function vaildationOfSearch() {
//   if (!(fromField.value && toField.value)) {
//     searchAlert.textContent = 'Please Enter The Dates ';
//     return false;
//   }
//   searchAlert.textContent = '';
//   return true;
// }

// async function fetching(url, data, method) {
//   const response = await axios({ data, url, method });
//   // return response.data;
//   console.log(response.data);
// }
