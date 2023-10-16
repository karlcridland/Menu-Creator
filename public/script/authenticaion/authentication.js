export class Authentication {

    constructor(hasAccount) {
        const alt = hasAccount ? 'in' : 'up';
        this.elements = [];

        this.display = document.createElement('div');
        this.display.setAttribute('id', `sign-${alt}`);
        document.getElementById('authentication').appendChild(this.display);

        this.errorMessage = document.createElement('div');
        this.errorMessage.setAttribute('id', `sign-${alt}-error`);
        this.errorMessage.setAttribute('class', 'disabled');
    }

    createConfirmButton(text, hasAccount) {
        const alt = hasAccount ? 'in' : 'up';
        const button = document.createElement('button');
        button.setAttribute('id', `sign-${alt}-button`);
        button.textContent = text;

        return button;
    }

    createDisplay() {
        const display = this.display;
        this.elements.forEach((element) => {
            display.appendChild(element);
        })
    }

    createTitle(text) {
        const title = document.createElement('h1');
        title.innerHTML = text;
        return title;
    }

    createFlex(flexGrow, minHeight, maxHeight) {
        const div = document.createElement('div');
        div.style.flexGrow = flexGrow;
        div.style.minHeight = minHeight;
        div.style.maxHeight = maxHeight;
        return div;
    }

    createWrapper(id, placeholder, type) {
        const wrapper = document.createElement('div');
        wrapper.setAttribute('id', `${id}-wrapper`);
        wrapper.setAttribute('class', 'auth-input');

        const input = document.createElement('input');
        input.setAttribute('id', id);
        input.setAttribute('class', 'grey-area auth-input');
        input.setAttribute('placeholder', placeholder);
        input.setAttribute('type', type);
        wrapper.appendChild(input);

        return wrapper;
    }

    createPrivacy() {
        const privacy = document.createElement('a');
        privacy.setAttribute('href', '/privacy-policy.html');
        privacy.setAttribute('target', '_blank');
        privacy.setAttribute('class', 'privacy-policy');
        privacy.textContent = 'Privacy policy';
        return privacy;
    }

    displayError(message) {
        const errorMessage = this.errorMessage;
        if (message) {
            errorMessage.classList.remove('disabled');
            errorMessage.innerHTML = `<img inline src="../../resources/alert.svg"><span>${message}</span>`;
        }
        else {
            errorMessage.classList.add('disabled');
        }
    }

    getErrorMessage(code, hasAccount) {
        const alt = hasAccount ? 'in' : 'up';
        switch (code) {
            case 'auth/invalid-email':
                return 'Please enter a valid email address.';
            case 'auth/invalid-login-credentials':
                return 'Email address and password do not match.';
            case 'auth/missing-password':
                return 'Please enter your password.';
            default:
                return `Error signing ${alt}.`;
        }
    }

}