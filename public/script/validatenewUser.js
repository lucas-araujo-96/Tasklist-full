class Form {
    constructor() {
        this.form = document.querySelector(`.form`);
    };

    validateForm() {
        if(this.fieldsAreValid() && this.passwordIsValid()) {
            this.form.submit();
        } else {
            window.alert(this.fieldsAreValid() ? `Senha` : `Campos`);
        };
    };

    passwordIsValid() {
        const password = document.querySelector(`.password`).value.trim();
        const confirmPassword = document.querySelector(`.confirmPassword`).value.trim();
        return ((password === confirmPassword) && password.length >= 8);
    };

    fieldsAreValid() {
        return ((document.querySelector(`.email`).value.trim().length >= 10)
            && (document.querySelector(`.name`).value.trim().length >= 2)
            && (document.querySelector(`.login`).value.trim().length >= 6));
    };
};

(() => {
    document.querySelector(`.createUser`).addEventListener(`click`, (e) => {
        const form = new Form();
        form.validateForm();
    });
})();