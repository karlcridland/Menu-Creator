export const authenticationPane = document.getElementById('authentication');

import "../script/authenticaion/sign-in.js";
import { SignIn } from "../script/authenticaion/sign-in.js";
import "../script/authenticaion/sign-up.js";
import { SignUp } from "../script/authenticaion/sign-up.js";

const signIn = new SignIn();
const signUp = new SignUp();

const signUpFormButton = document.getElementById('sign-up-form-button');
const authBack = document.getElementById('auth-back');
const signInEmail = document.getElementById('sign-in-email');
const signUpBusiniess = document.getElementById('sign-up-business');

signUpFormButton.addEventListener('click', () => {
    scrollTo(authenticationPane.clientWidth, signUpBusiniess);
    window.addEventListener('resize', () => {
        scrollTo(authenticationPane.clientWidth, signUpBusiniess);
    })
})

authBack.addEventListener('click', () => {
    scrollTo(0, signInEmail);
    window.addEventListener('resize', () => {
        scrollTo(authenticationPane.clientWidth, signUpBusiniess);
    })
})

function scrollTo(left, input) {
    authenticationPane.scrollTo({
        top: 0,
        left: left,
        behavior: "smooth"
    });
    window.setTimeout(() => {
        input.focus();
    }, 400);
}