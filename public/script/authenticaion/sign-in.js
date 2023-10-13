import { signIn } from "../firebase.js";

export const profilePicture = document.getElementById('profile-picture');
export const signInEmail = document.getElementById('sign-in-email');
export const signInPassword = document.getElementById('sign-in-password');
export const forgottenPassword = document.getElementById('forgotten-password');
export const signInButton = document.getElementById('sign-in-button');
const errorMessage = document.getElementById('sign-in-error');

export function attemptSignIn() {
    console.log('hi')
    const email = signInEmail.value;
    const password = signInPassword.value;
    signIn(email, password, (error) => {
        console.log(error.code)
        switch (error.code) {
            case 'auth/invalid-email':
                displayError('Please enter a valid email address.');
                break;
            case 'auth/invalid-login-credentials':
                displayError('Email address and password do not match.');
                break;
            case 'auth/missing-password':
                displayError('Please enter your password.');
                break;
            default:
                displayError('Error signing in.');
                break;
        }
    })
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

signInButton.addEventListener('click', () => {
    attemptSignIn();
});

[signInEmail, signInPassword].forEach((input) => {
    input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) attemptSignIn();
        else displayError(null);
    })
})