export class SignUpError {
    constructor(errorCheck, message) {
        this.errorCheck = errorCheck;
        this.message = message;
    }

    check() {
        return this.errorCheck();
    }
}