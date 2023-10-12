
export const signUpButton = document.getElementById('sign-up-button');

const signUpFirst = document.getElementById('sign-up-first');
const signUpLast = document.getElementById('sign-up-last');
const signUpEmail = document.getElementById('sign-up-email');
const signUpPassword = document.getElementById('sign-up-password');
const signUpConfirm = document.getElementById('sign-up-confirm');
const errorMessage = document.getElementById('sign-up-error');

const allFields = [signUpFirst, signUpLast, signUpEmail, signUpPassword, signUpConfirm];

console.log(signUpButton);
signUpButton.addEventListener('click', () => {
    if (shouldProceed()){

    }
});

function shouldProceed(){
    if (allFieldsFilled()){

    }
    else{
        displayError('Please fill out all fields.')
    }
}

function allFieldsFilled(){
    return allFields.map(x => x.value).filter(x => x !== "").length > 0;
};

function displayError(text) {
    if (text) {
        errorMessage.classList.remove('disabled');
        errorMessage.innerHTML = `<img inline src="../../resources/alert.svg"><span>${text}</span>`;
    }
    else {
        errorMessage.classList.add('disabled');
    }
}

