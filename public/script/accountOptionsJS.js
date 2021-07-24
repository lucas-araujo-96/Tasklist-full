function enableEdit() {
    let inforItems = document.querySelectorAll(`.info`);
    inforItems.forEach((info) => {
        info.removeAttribute(`disabled`);
    });
    let btnEditar = document.querySelector(`.editar`);
    btnEditar.setAttribute(`value`, `Aplicar alterações`);
    btnEditar.setAttribute(`onClick`, `document.querySelector('.inforUpdate').submit();`);
};