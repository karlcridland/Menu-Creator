const authenticationPane = document.getElementById('authentication');
const profilePicture = document.getElementById('profile-picture');
const signInEmail = document.getElementById('sign-in-email');
const signInPassword = document.getElementById('sign-in-password');
const signInButton = document.getElementById('sign-in-button');
const signUpFormButton = document.getElementById('sign-up-form-button');
const forgottenPassword = document.getElementById('forgotten-password');

const authBack = document.getElementById('auth-back');

signUpFormButton.addEventListener('click', () => {
    authenticationPane.scrollTo({
        top: 0,
        left: authenticationPane.clientWidth,
        behavior: "smooth"
    });
})

authBack.addEventListener('click', () => {
    authenticationPane.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
})

signUpFormButton.click();