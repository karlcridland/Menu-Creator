export class SignUpError {
    constructor(errorCheck, message, authentication) {
        this.errorCheck = errorCheck;
        this.message = message;
        this.authentication = authentication;
    }

    check() {
        return this.errorCheck();
    }
}