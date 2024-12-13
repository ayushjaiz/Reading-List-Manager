// Regular expression for email validation
const emailRegex: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateEmail(email: string): boolean {
    return emailRegex.test(email);
}

// Regular expression for password validation (5 letters)
const passwordRegex: RegExp = /^.{6,}$/;

function validatepassword(password: string): boolean {
    return passwordRegex.test(password);
}

export { validateEmail, validatepassword };