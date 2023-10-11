export const authenticationPane = document.getElementById('authentication');

import "../script/authenticaion/sign-in.js";
import "../script/authenticaion/sign-up.js";

const signUpFormButton = document.getElementById('sign-up-form-button');
const authBack = document.getElementById('auth-back');
const signInEmail = document.getElementById('sign-in-email');
const signUpFirst = document.getElementById('sign-up-first');

signUpFormButton.addEventListener('click', () => {
    authenticationPane.scrollTo({
        top: 0,
        left: authenticationPane.clientWidth,
        behavior: "smooth"
    })
    window.setTimeout(() => {
        signUpFirst.focus();
    }, 400);
})

authBack.addEventListener('click', () => {
    authenticationPane.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
    window.setTimeout(() => {
        signInEmail.focus();
    }, 400);
})