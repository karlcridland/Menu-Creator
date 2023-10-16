import { Authentication } from "./authentication.js";
import { SignUpError } from "./sign-up-error.js";

export class SignUp extends Authentication {

    constructor() {
        super(false);

        this.errors = [
            new SignUpError(this.allFieldsFilled, 'Please fill out all fields.'),
            new SignUpError(this.isValidEmail, 'Please enter a valid email address.'),
            new SignUpError(this.isValidPassword, 'Please ensure your password is at least 10 characters long, contains at least one lowercase letter, one uppercase letter, one digit'),
            new SignUpError(this.areTermsTicked, 'Terms & Conditions need to be agreed to in order to create an account.'),
        ];

        this.elements.push(this.createFlex(0, '0px'));
        this.elements.push(this.createBackButton());
        this.elements.push(this.createFlex(3, '20px'));
        this.elements.push(this.createTitle('Sign up'));
        this.elements.push(this.createFlex(3, '20px'));
        this.elements.push(this.createWrapper('sign-up-business', 'Business name', 'text'));
        this.elements.push(this.createFlex(1, '20px', '24px'));
        this.elements.push(this.createWrapper('sign-up-first', 'First name', 'text'));
        this.elements.push(this.createFlex(1, '20px', '24px'));
        this.elements.push(this.createWrapper('sign-up-last', 'Last name', 'text'));
        this.elements.push(this.createFlex(1, '20px', '24px'));
        this.elements.push(this.createWrapper('sign-up-email', 'Email address', 'email'));
        this.elements.push(this.createFlex(1, '20px', '24px'));
        this.elements.push(this.createWrapper('sign-up-password', 'Password', 'password'));
        this.elements.push(this.createFlex(1, '20px', '24px'));
        this.elements.push(this.createWrapper('sign-up-confirm', 'Confirm password', 'password'));
        this.elements.push(this.createFlex(1, '20px', '24px'));
        this.elements.push(this.createTerms());
        this.elements.push(this.createFlex(1, '20px', '24px'));
        this.elements.push(this.createConfirmButton('continue', false));
        this.elements.push(this.errorMessage);
        this.elements.push(this.createFlex(6, '20px'));
        this.elements.push(this.createPrivacy());
        this.elements.push(this.createFlex(1, '20px'));

        this.createDisplay();

    }

    createDisplay() {
        super.createDisplay();

        const self = this;
        const signUpButton = document.getElementById('sign-up-button');
        const termsAndConditions = document.getElementById('terms-tickbox');

        signUpButton.addEventListener('click', () => {
            self.attemptSignUp();
        });

        this.allFields().forEach((input) => {
            input.addEventListener('keyup', (e) => {
                if (e.key === 'Enter' || e.keyCode === 13) self.attemptSignUp();
                else self.displayError(null);
            });
            ['input', 'focus'].forEach((listener) => {
                input.addEventListener(listener, () => {
                    if (input.value === '') input.parentElement.classList.add('hide-popup');
                    else input.parentElement.classList.remove('hide-popup');
                });
            })
        })

        termsAndConditions.addEventListener('change', () => {
            self.displayError(null);
        })
    }

    createTerms() {
        const terms = document.createElement('label');
        terms.setAttribute('id', 'sign-up-terms');

        const termsTickHolder = document.createElement('div');
        termsTickHolder.setAttribute('id', 'terms-tick-holder');
        terms.appendChild(termsTickHolder);

        const tick = document.createElement('input');
        tick.setAttribute('id', 'terms-tickbox');
        tick.setAttribute('type', 'checkbox');
        termsTickHolder.appendChild(tick);

        const text = document.createElement('div');
        text.innerHTML = `I have read and agreed to the <a href="./terms-and-conditions.html" target="_blank">terms & conditions</a>.`;
        terms.appendChild(text);

        return terms;
    }

    createBackButton() {
        const button = document.createElement('button');
        button.setAttribute('id', 'auth-back');

        const image = document.createElement('img');
        image.setAttribute('src', './resources/arrow-left-white.svg');

        const span = document.createElement('span');
        span.textContent = 'back';

        button.appendChild(image);
        button.appendChild(span);

        return button;
    }

    attemptSignUp() {
        if (shouldProceed()) {
            console.log('All good, proceed.');
        }
        else {
            console.log('Whoops, error displayed.');
        }
    }

    allFieldsFilled() {
        const result = this.allFields().map(x => x.value).filter(x => x === "").length === 0;
        return result;
    };

    isValidEmail() {
        const signUpEmail = document.getElementById('sign-up-email');
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(signUpEmail.value);
    }

    isValidPassword() {
        const signUpPassword = document.getElementById('sign-up-password');
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*-).{10,}$/;
        return passwordRegex.test(signUpPassword.value);
    }

    areTermsTicked() {
        const termsAndConditions = document.getElementById('terms-tickbox');
        return termsAndConditions.checked;
    }

    allFields() {
        const signUpBusiness = document.getElementById('sign-up-business');
        const signUpFirst = document.getElementById('sign-up-first');
        const signUpLast = document.getElementById('sign-up-last');
        const signUpEmail = document.getElementById('sign-up-email');
        const signUpPassword = document.getElementById('sign-up-password');
        const signUpConfirm = document.getElementById('sign-up-confirm');

        return [signUpBusiness, signUpFirst, signUpLast, signUpEmail, signUpPassword, signUpConfirm];
    }

    shouldProceed() {
        const self = this;
        let errorMessage;
        self.errors.forEach((error) => {
            if (!error.check() && !errorMessage) errorMessage = error.message;
        });
        if (errorMessage) return self.displayError(errorMessage);
        return true;
    }

}