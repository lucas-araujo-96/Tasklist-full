class Form {
    constructor() {
        this.form = document.querySelector(`.form`);
    };

    validateForm() {
        if(this.fieldsAreValid() && this.passwordIsValid()) {
            this.form.submit();
        } else {
            window.alert(`Stub Error`);
        };
    };

    passwordIsValid() {
        const password = document.querySelector(`.password`).value.trim();
        const confirmPassword = document.querySelector(`.confirmPassword`).value.trim();
        return ((password === confirmPassword) && password.length >= 8);
    };

    fieldsAreValid() {
        const email = document.querySelector(`.email`).value.trim();
        const name = document.querySelector(`.name`).value.trim();
        const login = document.querySelector(`.login`).value.trim();
        return ((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
            && name !== `` 
            && login !== ``);
    };
};

(() => {
    document.querySelector(`.createUser`).addEventListener(`click`, (e) => {
        const form = new Form();
        form.validateForm();
    });
})();