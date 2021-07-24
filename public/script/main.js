function createTask() {
    const task = document.querySelector(`.txtTarefa`).value;
    const txtNode = document.createTextNode(task);
    const li = document.createElement(`li`);
    li.appendChild(txtNode);
    document.querySelector(`.lista`).appendChild(li);
};