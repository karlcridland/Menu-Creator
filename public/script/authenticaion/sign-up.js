
export const signUpButton = document.getElementById('sign-up-button');

const signUpBusiness = document.getElementById('sign-up-business');
const signUpFirst = document.getElementById('sign-up-first');
const signUpLast = document.getElementById('sign-up-last');
const signUpEmail = document.getElementById('sign-up-email');
const signUpPassword = document.getElementById('sign-up-password');
const signUpConfirm = document.getElementById('sign-up-confirm');
const errorMessage = document.getElementById('sign-up-error');

const allFields = [signUpBusiness, signUpFirst, signUpLast, signUpEmail, signUpPassword, signUpConfirm];

class SignUpError {
    constructor(errorCheck, message) {
        this.errorCheck = errorCheck;
        this.message = message;
    }

    check() {
        return this.errorCheck();
    }
}

const errors = [
    new SignUpError(allFieldsFilled, 'Please fill out all fields.'),
    new SignUpError(isValidEmail, 'Please enter a valid email address.'),
    new SignUpError(isValidPassword, 'Please ensure your password is at least 10 characters long, contains at least one lowercase letter, one uppercase letter, one digit'),
];

signUpButton.addEventListener('click', () => {
    attemptSignUp();
});

function attemptSignUp() {
    if (shouldProceed()) {

    }
}

function allFieldsFilled() {
    const result = allFields.map(x => x.value).filter(x => x === "").length === 0;
    console.log(result);
    return result;
};

function isValidEmail() {
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(signUpEmail.value);
}

function isValidPassword() {
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*-).{10,}$/;
    return passwordRegex.test(signUpPassword.value);
}

allFields.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) attemptSignUp();
        else displayError(null);
    })
})

function shouldProceed() {
    let errorMessage;
    errors.forEach((error) => {
        if (!error.check() && !errorMessage) errorMessage = error.message;
    });
    if (errorMessage) return displayError(errorMessage);
    return true;
}

function displayError(text) {
    if (text) {
        errorMessage.classList.remove('disabled');
        errorMessage.innerHTML = `<img inline src="../../resources/alert.svg"><span>${text}</span>`;
    }
    else {
        errorMessage.classList.add('disabled');
    }
    return false;
}

