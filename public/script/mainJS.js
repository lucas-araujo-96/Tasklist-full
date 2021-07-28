class Task { //classe da tarefa
    constructor() { //construtor
        this.taskText = document.querySelector(`.txtTarefa`).value; //texto da tarefa
        this.risked = false; //se ela está riscada ou não
    };

    static insertTask(node) { //insere o elemento recebido no DOM, na lista de tarefas
        document.querySelector(`.lista`).appendChild(node);
    };

    static generateDeleteBtn() { //gera o botão de deletar
        let btn = document.createElement(`input`);

        btn.setAttribute(`type`, `button`);
        btn.setAttribute(`value`, `Apagar`);
        btn.classList.add(`remove`);

        return btn;
    };

    static generateDoneChkBox() { //gera o checkbox que risca a tarefa
        let chk = document.createElement(`input`);

        chk.setAttribute(`type`, `checkbox`);
        chk.classList.add(`risk`);

        return chk;
    };

    configureNode() { //configura o elemento completo com a tarefa inserida no formulário
        const txtNode = document.createTextNode(this.taskText);
        const deleteBtn = Task.generateDeleteBtn();
        const doneChkBox = Task.generateDoneChkBox();

        let node = document.createElement(`li`);
        node.classList.add(`taskItem`);
        node.appendChild(doneChkBox);
        node.appendChild(txtNode);
        node.appendChild(deleteBtn);

        return node;
    };  
};

class TaskList { //classe da lista de tarefas, abrange a lista em si e o formulário
    constructor() {
        this.taskList = document.querySelector(`.lista`);
        this.taskForm = document.querySelector(`.newTarefa`);
    };

    static listTasks() { //gera um array de objetos com as tarefas atualmente na lista
        const tasks = document.querySelectorAll(`.taskItem`);
        const taskArray = [];
        tasks.forEach((e) => {
            taskArray.push({task: e.innerText, risked: e.classList.contains(`risked`)});
        });
        return taskArray;
    };

    static updateTaskList() { //faz uma requisição ao servidor enviando a lista de tarefas atualizada
        const taskList = TaskList.listTasks();
        const jsonString = JSON.stringify(taskList);
        const options = {
            method: `POST`,
            headers: {
                'Content-Type':'application/json',
            },
            body:jsonString,
        };
        fetch(`/updateTaskList`, options).then((fetched) => {
            return;
        });
        return;
    };

    newTask() { //gera nova tarefa e a anexa (gerada no formulário)
        const task = new Task();
        Task.insertTask(task.configureNode());
    };

    listenForEvents() { //cria os eventListeners para as funções da lista de tarefas
        this.taskList.addEventListener(`click`, (e) => { //event listener para apagar ou riscar/desriscar as tarefas
            const element = e.target;
            if(element.classList.contains(`remove`)) element.parentElement.remove();
            if (element.classList.contains(`risk`)) {
                if(element.parentElement.classList.contains(`risked`)) element.parentElement.classList.remove(`risked`);
                else element.parentElement.classList.add(`risked`);
            }; 
            TaskList.updateTaskList();
      });

      this.taskForm.addEventListener(`click`, (e) => { //eventListener para criação de nova tarefa
        const element = e.target;
        if(element.classList.contains(`newTarefaBtn`)) {
            this.newTask();    
            TaskList.updateTaskList();
        }; 
      });
    };
};

(() => { //main, instancia a lista de tarefas e inicia os EventListeners
    const userTaskList = new TaskList();
    userTaskList.listenForEvents();
})();