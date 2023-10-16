import { signIn } from "../firebase.js";
import { Authentication } from "./authentication.js";

export const profilePicture = document.getElementById('profile-picture');
const errorMessage = document.getElementById('sign-in-error');


export class SignIn extends Authentication {

    constructor() {
        super(true);

        this.elements.push(this.createFlex(1, '20px'));
        this.elements.push(this.createProfilePicture());
        this.elements.push(this.createFlex(1, '20px'));
        this.elements.push(this.createTitle('Do you have an account with us? Sign in here:'));
        this.elements.push(this.createFlex(1, '20px'));
        this.elements.push(this.createTitle(`Otherwise, <a id="sign-up-form-button">sign up</a>!`));
        this.elements.push(this.createFlex(1, '20px'));
        this.elements.push(this.createWrapper('sign-in-email', 'Email address', 'email'));
        this.elements.push(this.createFlex(1, '20px', '30px'));
        this.elements.push(this.createWrapper('sign-in-password', 'Password', 'password'));
        this.elements.push(this.createFlex(1, '20px', '30px'));
        this.elements.push(this.createConfirmButton('sign-in', true));
        this.elements.push(this.createFlex(1, '20px'));
        this.elements.push(this.errorMessage);
        this.elements.push(this.createFlex(3, '20px'));
        this.elements.push(this.createForgotPassword());
        this.elements.push(this.createFlex(1, '20px'));
        this.elements.push(this.createPrivacy());
        this.elements.push(this.createFlex(1, '20px'));

        this.createDisplay();

    }

    createDisplay() {
        const self = this;
        super.createDisplay(); 

        const signInEmail = document.getElementById('sign-in-email');
        const signInPassword = document.getElementById('sign-in-password');
        const signInButton = document.getElementById('sign-in-button');
        
        signInButton.addEventListener('click', () => {
            self.attemptSignIn();
        });

        [signInEmail, signInPassword].forEach((input) => {
            input.addEventListener('keyup', (e) => {
                if (e.key === 'Enter' || e.keyCode === 13) self.attemptSignIn();
                else self.displayError(null);
            });
            ['input', 'focus'].forEach((listener) => {
                input.addEventListener(listener, () => {
                    if (input.value === '') input.parentElement.classList.add('hide-popup');
                    else input.parentElement.classList.remove('hide-popup');
                });
            })
        })

    }

    createForgotPassword() {
        const forgot = document.createElement('a');
        forgot.textContent = 'Forgotten your password?';

        return forgot;
    }

    createProfilePicture() {
        const picture = document.createElement('div');
        picture.setAttribute('id', 'profile-picture');

        return picture;
    }

    attemptSignIn() {
        const self = this;
        const email = document.getElementById('sign-in-email').value;
        const password = document.getElementById('sign-in-password').value;
        signIn(email, password, (error) => {
            const errorMessage = self.getErrorMessage(error.code);
            self.displayError(errorMessage);
        })
    };

}