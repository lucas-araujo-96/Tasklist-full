function enableEdit() { //função para habilitar a edição dos dados
    let inforItems = document.querySelectorAll(`.info`);
    inforItems.forEach((info) => { //habilita os campos de dados
        info.removeAttribute(`disabled`);
    });
    let btnEditar = document.querySelector(`.editar`); 
    btnEditar.setAttribute(`value`, `Aplicar alterações`);
    btnEditar.setAttribute(`onClick`, `document.querySelector('.inforUpdate').submit();`); //altera o botão de "habilitar edição" para "submit"
};