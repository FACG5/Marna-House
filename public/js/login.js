
const btn = document.getElementById('btn');
const username = document.getElementById('username');
const password = document.getElementById('password');
const errorLabel = document.getElementById('alert');
const sign_in = document.getElementsByTagName('a')[0];
const Progress = document.getElementsByClassName('Progress')[0];


// Regex For Validation
const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

btn.addEventListener('click', () => {
  // Progress.setAttribute('style', 'display:block');

  errorLabel.textContent = '';
  if (vaild()) {
    login();
  } else {
    errorLabel.textContent = ('Please Check All Fields ');
  }
});
// Sign in button
sign_in.addEventListener('click', () => {
  window.location = '/sign_up';
});


// Login
const login = async () => {
  const data = collectData();
  const response = await axios('/login', {
    method: 'post',
    data,
  });
  if (response.data.redirect) {
    window.location = response.data.redirect;
  } else {
    errorLabel.textContent = response.data.error;
  }
};

// Collect Data From Inputs Fields
const collectData = () => ({
  email: username.value.trim(),
  password: password.value.trim(),
});
// Validation username
const checkUsername = (str) => {
  if (emailValid.test(str)) {
    return true;
  }
  return false;
};

// Validation all field is not empty
const checkField = () => {
  if (username.value.trim() && password.value.trim()) { return true; }

  return false;
};

// Check Every Fields
const vaild = () => (checkField() && checkUsername(username.value.trim()));

// Deal With Response From Fetch
const dealWithResponse = (err, response) => {
  // Progress.setAttribute('style', 'display:none');
  if (err) {
    errorLabel.textContent = err;
  } else if (response === '/home') {
    window.location = '/home';
  } else {
    errorLabel.textContent = response;
  }
};
