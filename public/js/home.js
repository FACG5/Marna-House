const fromField = document.querySelector('.middle--section__form__main--input--from');
const toField = document.querySelector('.middle--section__form__main--input--to');
const dropBtn = document.querySelector('.middle--section__form__main--dropbox--test .title');
const dropBox = document.querySelector('.dropbox-options-box');
const searchBtn = document.querySelector('.middle--section__form__main--submit');
const searchAlert = document.querySelector('.middle--section__form__main--alert');
const resultSection = document.querySelector('.main--section__result');
const footerSection = document.querySelector('.footer');
const mainSection = document.querySelector('main');
const mainModel = document.querySelector('.details--model');
const detailsModel = document.querySelector('.details--model__content');
const submitModel = document.querySelector('.submit--model__content');
const confirmationModel = document.querySelector('.confirmation--model__content');
const nextBtn = document.querySelector('.main--section--buttons--next');
const clearBtn = document.querySelector('.main--section--buttons--cancel');
const confirmAlert = document.querySelector('.sumbit-error-alert');
const titleTag = document.querySelector('.main--section__header');
const selectedRooms = [];
const selectedTime = {};

flatpickr(fromField, {
  minDate: 'today',
});

flatpickr(toField, {
  minDate: 'today',
});

function availableRoomData() {
  return {
    from: fromField.value,
    to: toField.value,
    type: dropBtn.textContent.toLowerCase(),
  };
}

function vaildationOfSearch() {
  if (!(fromField.value && toField.value)) {
    searchAlert.textContent = 'Please Enter The Dates ';
    return false;
  } if ((dropBtn.textContent.toLowerCase() === 'room\'s type ')) {
    searchAlert.textContent = 'Please Enter The Room Type ';
    return false;
  }
  searchAlert.textContent = '';
  return true;
}

searchBtn.addEventListener('click', (event) => {
  if (vaildationOfSearch()) {
    const data = availableRoomData();
    getAvailableRooms('/available-rooms', data, 'post');
    selectedTime.from = data.from;
    selectedTime.to = data.to;
    selectedTime.type = data.type
    titleTag.textContent = `${data.type.toUpperCase()} :`;
  }
});

function InsertRooms(room) {
  const roomTag = document.createElement('div');
  roomTag.classList.add('main--section__result__item');
  roomTag.innerHTML = `<div class="main--section__result__item--img">
  <div class="main--section__result__item--img--front">
  <img src="${room.img}" alt="Room Img">
  </div>

  <div class="main--section__result__item--img--back">
  <input type="submit" value="Book it" room_id=${room.room_num} class="room_book_btn">
  <input type="submit" value="Details" room_id=${room.room_num} class="room_details_btn">
  </div>

  </div>
  <div class="main--section__result__item--details">
  <span>Room Number : ${room.room_num} </span>
  <span>Price : ${room.price}$ </span>
  </div> `;
  resultSection.appendChild(roomTag);
}

// get the details of room .
async function roomDetails(id) {
  const response = await axios({ url: `/room-details/${id}`, method: 'get' });
  const room = response.data.result[0];
  detailsModelShow(room);
}

// Get Available Rooms From database .
async function getAvailableRooms(url, data, method) {
  const response = await axios({ data, url, method });
  resultSection.innerHTML = '';
  let buttonNumber = 0;

  if (response.data.result) {
    response.data.result.forEach((element) => {
      InsertRooms(element);
      const bookBtn = document.getElementsByClassName('room_book_btn')[buttonNumber];
      const detailsBtn = document.getElementsByClassName('room_details_btn')[buttonNumber];
      detailsBtn.addEventListener('click', () => {
        roomDetails(element.room_num);
      });
      bookBtn.addEventListener('click', bookingEvent);
      buttonNumber += 1;
    });

    // Scroll Down And Show the footer and the Result Section
    footerSection.classList.remove('hide');
    mainSection.classList.remove('hide');
    const position = mainSection.offsetTop;
    window.scrollBy({
      top: position, // could be negative value
      left: 0,
      behavior: 'smooth',
    });
  } else {
    window.location = '/';
  }
}

function bookingEvent(event) {
  const button = event.target;
  const roomNum = button.getAttribute('room_id');
  const index = selectedRooms.indexOf(roomNum);
  styleingBtns(button);
  if (index >= 0) {
    selectedRooms.splice(index, 1);
  } else {
    selectedRooms.push(roomNum);
  }
  styleingBtns(button);
}

function styleingBtns(button) {
  const roomNum = button.getAttribute('room_id');
  const coverBtn = document.querySelector(`.room_book_btn[room_id="${roomNum}"]`);
  if (selectedRooms.indexOf(roomNum) >= 0) {
    button.setAttribute('style', 'background:red;');
    button.value = 'Un Book';
    coverBtn.setAttribute('style', 'background:red;');
    coverBtn.value = 'Un Book';
  } else {
    button.setAttribute('style', 'background:#0BD681;');
    button.value = 'Book it';
    coverBtn.setAttribute('style', 'background:#0BD681;');
    coverBtn.value = 'Book it';
  }
}

function hideAllModels() {
  mainModel.setAttribute('style', 'display:none;');
  detailsModel.setAttribute('style', 'display:none;');
  submitModel.setAttribute('style', 'display:none;');
  confirmationModel.setAttribute('style', 'display:none;');
}

mainModel.addEventListener('click', (event) => {
  if (event.target === mainModel) {
    hideAllModels();
  }
});

function collectUserInfo() {
  const firstName = document.querySelector('#first-name').value;
  const lastName = document.querySelector('#last-name').value;
  const emailAddress = document.querySelector('#email').value;
  const phoneNum = document.querySelector('#phone').value;

  return {
    firstName,
    lastName,
    emailAddress,
    phoneNum,
  };
}
const vaildationMakeReservation = (userInfo) => {
  const regexName = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/;
  const regexPhone = /^\d+$/;
  if (!regexName.test(userInfo.firstName)) {
    return 'Please Check First Name ';
  }
  if (!(regexName.test(userInfo.lastName))) {
    return 'Please Check Last Name';
  }
  if (!validateEmail(userInfo.emailAddress)) {
    return 'Please Check Your Email Address';
  } if (!regexPhone.test(userInfo.phoneNum)) {
    return 'Please Check Your Phone Number';
  }
  return null;
};

nextBtn.addEventListener('click', () => {
  hideAllModels();
  submitModel.setAttribute('style', 'display:block;');
  mainModel.setAttribute('style', 'display:block;');
  const closeModelBtn = submitModel.querySelector('.submit--model__close');
  const cancelModelBtn = submitModel.querySelector('.submit--model--btns--red');
  const submitModelBtn = submitModel.querySelector('.submit--model--btns--blue');
  cancelModelBtn.addEventListener('click', hideAllModels);
  closeModelBtn.addEventListener('click', hideAllModels);
  submitModelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const userInfo = collectUserInfo();
    const vaildationValue = vaildationMakeReservation(userInfo);
    if (!vaildationValue) {
      const reservationInfo = {
        rooms: selectedRooms,
        userInfo,
        from: selectedTime.from,
        to: selectedTime.to,
        type: selectedTime.type,
      };
      fetch('/reservations', {
        method: 'post',
        body: JSON.stringify(reservationInfo),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then((res) => {
          if (res.redirect) {
            window.location.reload();
          } else if (res.error) {
            confirmAlert.textContent = res.error;
          } else {
            res.forEach((elem) => {
              if (elem.err) {
                // show error modal
              } else {
                // show success
              }
            });
            // show email conirmation modal or error modal
          }
        })
        .catch(err => console.log(err));
    } else {
      confirmAlert.textContent = vaildationValue;
      setTimeout(() => {
        confirmAlert.textContent = '';
      }, 1000);
    }
  });
});

// To Vaild Email ;
function validateEmail(email) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}
dropBtn.addEventListener('click', () => {
  dropBox.classList.toggle('opcity-zero');
});

dropBox.addEventListener('click', (event) => {
  dropBtn.textContent = event.target.textContent;
  dropBox.classList.add('opcity-zero');
});
const collectDatatoReservarion = () => {
  const firstname = document.querySelector('.first-name-input').value;
  const lastname = document.querySelector('.last-name-input').value;
  const email = document.querySelector('.email-address-input').value;
  const phone = document.querySelector('.phone-number-input').value;
  return {
    firstname,
    lastname,
    email,
    phone,
    from: reservationInterval.from,
    to: reservationInterval.to,
    selectedRooms,
  };
};
const makeReservation = () => {
  const data = JSON.stringify(collectDatatoReservarion());
  fetch('/addreservation', {
    method: 'post',
    body: data,
    headers: { 'Content-type': 'application/json' },
  })
    .then(res => (res.json()))
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

clearBtn.addEventListener('click', () => {
  selectedRooms.splice(0, selectedRooms.length);
  const allBtns = document.querySelectorAll('.room_book_btn');
  allBtns.forEach(element => styleingBtns(element));
});

function detailsModelShow(room) {
  hideAllModels();

  const details = detailsModel.querySelector('.room-detials--para');
  const services = detailsModel.querySelector('.room-services--para');
  const img = detailsModel.querySelector('.details--model__img img');
  const closeBtn = detailsModel.querySelector('.details--model__close');
  const cancelBtn = detailsModel.querySelector('.details--model--btns--red');
  const bookBtn = detailsModel.querySelector('.details--model--btns--blue');
  details.textContent = room.description;
  services.textContent = room.services;
  img.setAttribute('src', room.imgs);
  closeBtn.addEventListener('click', hideAllModels);
  cancelBtn.addEventListener('click', hideAllModels);

  mainModel.setAttribute('style', 'display:block;');
  detailsModel.setAttribute('style', 'display:block;');
  bookBtn.setAttribute('room_id', room.room_num);
  styleingBtns(bookBtn);
  bookBtn.addEventListener('click', bookingEvent);
}
