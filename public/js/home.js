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
const submitModel = document.querySelector('.total--model__total');
const confirmationModel = document.querySelector('.confirmation--model__content');
const nextBtn = document.querySelector('.main--section--buttons--next');
const clearBtn = document.querySelector('.main--section--buttons--cancel');
const confirmAlert = document.querySelector('.sumbit-error-alert');
const titleTag = document.querySelector('.main--section__header');
const roomTable = document.querySelector('.total--model__selected-table');

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
    selectedTime.type = data.type;
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
  <input type="submit" value="Book it" room_id=${room.room_num} room_price=${room.price} room_type=${room.type} class="room_book_btn">
  <input type="submit" value="Details" room_id=${room.room_num} room_price=${room.price} room_type=${room.type} class="room_details_btn">
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
  const roomPrice = button.getAttribute('room_price');
  const roomType = button.getAttribute('room_type');

  // Get the index of room ;

  const index = getIndex(roomNum);

  styleingBtns(button);
  if (index >= 0) {
    selectedRooms.splice(index, 1);
  } else {
    selectedRooms.push({
      roomNum,
      roomPrice,
      roomType,
      selectedTime,
    });
  }
  styleingBtns(button);
}


function styleingBtns(button) {
  const roomNum = button.getAttribute('room_id');
  const coverBtn = document.querySelector(`.room_book_btn[room_id="${roomNum}"]`);
  const index = getIndex(roomNum);
  if (index >= 0) {
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

nextBtn.addEventListener('click', () => {
  if ((getCookie('jwt')) === undefined) {
    hideAllModels();
    swal({
      title: 'To Book Any Room You Should be logined !',
      text: ' Go To Login Page ?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          window.location = '/login';
        } else {
          return 5;
        }
      });
  } else if (selectedRooms.length === 0) {
    return swal({
      title: 'You Should At Least Choose One Room',
      text: 'You clicked the button!',
      icon: 'warning',
      button: 'Aww yiss!',
    });
  } else {
    roomTable.textContent = '';
    hideAllModels();
    submitModel.setAttribute('style', 'display:block;');
    mainModel.setAttribute('style', 'display:block;');
    const closeModelBtn = submitModel.querySelector('.details--model__close');
    const cancelModelBtn = submitModel.querySelector('.total--model--btns--red');
    const submitModelBtn = submitModel.querySelector('.total--model--btns--blue');
    cancelModelBtn.addEventListener('click', hideAllModels);
    closeModelBtn.addEventListener('click', hideAllModels);

    // Header of Table ;
    addRow({ roomNum: 'Room NO.', roomType: 'Room Type', roomPrice: 'Room Price In ' });
    let totalCount = 0;
    for (let i = 0; i < selectedRooms.length; i += 1) {
      addRow(selectedRooms[i]);
      totalCount += Number(selectedRooms[i].roomPrice);
    }


    addRow({ roomNum: '', roomType: '', roomPrice: totalCount });

    submitModelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const reservationInfo = {
        rooms: selectedRooms,
        from: selectedTime.from,
        to: selectedTime.to,
        type: selectedTime.type,
      };
      fetch('/reservations', {
        method: 'post',
        body: JSON.stringify(reservationInfo),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => {
          hideAllModels();
          return res.json();
        })
        .then((res) => {
          if (res.redirect) {
            window.location = res.redirect;
          } else if (res.error) {
            confirmAlert.textContent = res.error;
          } else {
            const unBookedRooms = [];
            const bookedRooms = [];
            res.forEach((elem) => {
              if (elem.err) {
                unBookedRoos.push(elem.room_id);
              }
            });
            if (unBookedRooms.length > 0) {
              swal({
                title: 'Sorry These Rooms has been booked .',
                text: (`${unbookedRooms}`),
                icon: 'warning',
                button: 'Aww yiss!',
              });
            } else {
              swal({
                title: 'Good job!',
                text: 'You clicked the button!',
                icon: 'success',
                button: 'Aww yiss!',
              });
              selectedRooms.splice(0, selectedRooms.length - 1);
            }
          }
        })
        .catch((err) => {
          window.location = '/';
        });
    });
  }
});


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
  bookBtn.setAttribute('room_price', room.price);
  bookBtn.setAttribute('room_type', room.type);
  styleingBtns(bookBtn);
  bookBtn.addEventListener('click', bookingEvent);
}

// the drop box settings ;
dropBtn.addEventListener('click', () => {
  dropBox.classList.toggle('opcity-zero');
});
dropBox.addEventListener('click', (event) => {
  dropBtn.textContent = event.target.textContent;
  dropBox.classList.add('opcity-zero');
});

const getIndex = (roomNum) => {
  for (let i = 0; i < selectedRooms.length; i += 1) {
    if (selectedRooms[i].roomNum === roomNum) { return i; }
  }
};

const addRow = (room) => {
  const tableRow = document.createElement('tr');
  const roomNum = document.createElement('td');
  const roomType = document.createElement('td');
  const roomPrice = document.createElement('td');

  // Content ;
  roomNum.textContent = room.roomNum;
  roomType.textContent = room.roomType;
  roomPrice.textContent = `${room.roomPrice}$`;

  // Nesting  ;
  tableRow.appendChild(roomNum);
  tableRow.appendChild(roomType);
  tableRow.appendChild(roomPrice);
  roomTable.appendChild(tableRow);
};

// get specific cookie ;
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
