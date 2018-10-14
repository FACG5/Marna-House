const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const submitBtn = document.getElementById('submitBtn');
const errorLabel = document.getElementById('alert');
const passwordSecure = document.getElementById('passwordSecure');
const notMatch = document.getElementsByClassName('confirm')[0];
const sign_in = document.getElementsByTagName('a')[0];
const Progress = document.getElementsByClassName('Progress')[0];

//Regex For Validation
const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const usernameValid = /^[-\w\.\_]{1,50}$/;
const strongPassword = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
const mediumPassword = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");

//listen for type email 
email.addEventListener('input', () => {
  checkEmail(email.value.trim());
});

//listen for type email 
username.addEventListener('input', () => {
  checkUsername(username.value.trim());
});

// listen for click on submit button
submitBtn.addEventListener('click', () => {
  // Progress.setAttribute('style', 'display:block');
  addUser();
});

// Listne for input in password
password.addEventListener('input', () => {

  if (strongPassword.test(password.value.trim())) {

    passwordSecure.textContent = "Strong";
    passwordSecure.className = "";
    passwordSecure.classList.add('green');

  } else if (mediumPassword.test(password.value.trim())) {

    passwordSecure.textContent = "Medium";
    passwordSecure.className = "";
    passwordSecure.classList.add('orange');

  } else {

    passwordSecure.textContent = "Week";
    passwordSecure.className = "";
    passwordSecure.classList.add('red');

  }
});
// Listen for confirm password 
confirmPassword.addEventListener('input', () => {

  if (confirmPassword.value !== password.value) {

    notMatch.setAttribute('style', "display:inline;");
    notMatch.textContent = "Not Match";
  } else {

    notMatch.setAttribute('style', "color:green;display:inline;");
    notMatch.textContent = "Match";

  }
});

// Listen for sign up button
sign_in.addEventListener('click', () => {
  window.location = '/sign_in';
});


// To Make Request Add User ; 
const addUser = async () => {

  if (vaild()) {
    const data = getData();
    const response = await axios('/signup', {
      method: 'post',
      data,
    });
    if (response.data.error) {
      errorLabel.textContent = response.data.error;
    } else {
      window.location = response.data.redirect;
    }
  } else {
    Progress.setAttribute('style', 'display:none');
  }
};

// To Get Data From Fields
const getData = () => {
  return {
    username: username.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
  };
};

// Check Every Fields 
const vaild = () => {
  return (checkEmail(email.value.trim()) &&
    checkField() &&
    checkUsername(username.value.trim()) &&
    checkPassword() && mediumPassword.test(password.value.trim())
  );
}

// Validation all field is not empty
const checkField = () => {
  if (username.value.trim() &&
    email.value.trim() &&
    password.value.trim() &&
    confirmPassword.value.trim()) {
    errorLabel.textContent = "";

    return true;
  } else {
    errorLabel.textContent = "Please Fill All Fields";
    return false;
  }


}

// Validation email
const checkEmail = (str) => {
  if (emailValid.test(str)) {
    errorLabel.textContent = "";
    return true;
  } else {
    errorLabel.textContent = "Please Email Syntax ";
    return false;
  }
}


// Validation username
const checkUsername = (str) => {
  if (usernameValid.test(str)) {
    return true;
  } else {
    errorLabel.textContent = "Please Username Syntax ";
    return false;
  };
}


// Check if password = confim password
const checkPassword = () => {
  return (password.value === confirmPassword.value);
}

// Deal With Response from xhr request 
const dealWithResponse = (err, response) => {
  // Progress.setAttribute('style', 'display:none');
  if (err)
    errorLabel.textContent = err;
  else if (response === '/sign_in')
    window.location = '/sign_in';

}
