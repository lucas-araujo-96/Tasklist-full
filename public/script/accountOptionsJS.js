function enableEdit() {
    let inforItems = document.querySelectorAll(`.info`);
    inforItems.forEach((info) => {
        info.removeAttribute(`disabled`);
    });
    let btnEditar = document.querySelector(`.editar`);
    btnEditar.setAttribute(`value`, `Aplicar alterações`);
    btnEditar.setAttribute(`onClick`, `submitChanges()`);
};

function submitChanges() {
    const newName = document.querySelector(`.name`).value;
    const checkName = newName.trim().length >= 2;
    const newEmail = document.querySelector(`.email`).value;
    const checkEmail = newEmail.trim().length >= 10;
    const newUsername = document.querySelector(`.username`).value;
    const checkUsername = newUsername.trim().length >= 6;
    if(checkName && checkEmail && checkUsername) {
            document.querySelector(`.inforUpdate`).submit();
    } else {
        console.log(newName.trim().length >= 2);
        console.log(newEmail.trim().length >= 10);
        console.log(newUsername.trim().length >= 6);
    };
};